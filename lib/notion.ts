import type { AssessmentResult, ContactData, ClaudeResponse } from './types'
import { buildScoreBars } from './scoring'
import {
  NOTION_API_BASE,
  NOTION_API_VERSION,
  NOTION_DATABASE_ID,
  NOTION_TEMPLATE_IDS,
} from '@/config/notion'
import { PILLAR_NAMES } from '@/config/scoring'
import { BOOKING_LINK } from '@/config/booking'

function notionHeaders() {
  return {
    'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_API_VERSION,
  }
}

async function notionGet(path: string): Promise<unknown> {
  const res = await fetch(`${NOTION_API_BASE}${path}`, {
    method: 'GET',
    headers: notionHeaders(),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Notion GET ${path} failed ${res.status}: ${body}`)
  }
  return res.json()
}

async function notionPost(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${NOTION_API_BASE}${path}`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion POST ${path} failed ${res.status}: ${text}`)
  }
  return res.json()
}

async function notionPatch(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${NOTION_API_BASE}${path}`, {
    method: 'PATCH',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion PATCH ${path} failed ${res.status}: ${text}`)
  }
  return res.json()
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// Poll until template blocks appear on the new page (up to 20s)
async function pollForBlocks(pageId: string): Promise<void> {
  const INTERVAL = 2000
  const TIMEOUT = 20000
  const start = Date.now()

  while (Date.now() - start < TIMEOUT) {
    const data = await notionGet(`/blocks/${pageId}/children`) as { results: unknown[] }
    if (data.results.length > 0) return
    await sleep(INTERVAL)
  }

  throw new Error(`pollForBlocks: no blocks appeared on page ${pageId} after ${TIMEOUT}ms — template may not have applied`)
}

// Fetch all child blocks recursively (no depth limit), 200ms delay before each child fetch
async function fetchAllBlocks(blockId: string): Promise<unknown[]> {
  const blocks: unknown[] = []
  let cursor: string | undefined = undefined

  do {
    const url = `/blocks/${blockId}/children${cursor ? `?start_cursor=${cursor}` : ''}`
    const data = await notionGet(url) as { results: Array<{id: string; has_children: boolean; [key: string]: unknown}>; has_more: boolean; next_cursor: string | null }

    for (const block of data.results) {
      blocks.push(block)
      if (block.has_children) {
        await sleep(200)
        const children = await fetchAllBlocks(block.id)
        ;(block as Record<string, unknown>).__children = children
      }
    }

    cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined
  } while (cursor)

  return blocks
}

// Replace {{PLACEHOLDER}} occurrences in rich_text array
function replacePlaceholdersInRichText(
  richText: Array<{ type?: string; text?: { content: string }; [key: string]: unknown }>,
  replacements: Record<string, string>
): boolean {
  let changed = false
  for (const span of richText) {
    if (span.text && typeof span.text.content === 'string') {
      let content = span.text.content
      for (const [key, value] of Object.entries(replacements)) {
        const placeholder = `{{${key}}}`
        if (content.includes(placeholder)) {
          content = content.split(placeholder).join(value)
          changed = true
        }
      }
      if (changed) span.text.content = content
    }
  }
  return changed
}

type ChangedBlock = { id: string; payload: Record<string, unknown> }

function omitNulls(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null))
}

const PATCHABLE_TYPES = [
  'paragraph', 'heading_1', 'heading_2', 'heading_3',
  'bulleted_list_item', 'numbered_list_item', 'quote',
  'callout', 'toggle', 'to_do',
]

// Pure walk — collect blocks that need patching (no I/O)
function collectChangedBlocks(
  blocks: unknown[],
  replacements: Record<string, string>
): ChangedBlock[] {
  const changed: ChangedBlock[] = []

  for (const block of blocks) {
    const b = block as Record<string, unknown>
    const blockType = b.type as string

    if (PATCHABLE_TYPES.includes(blockType)) {
      const typeData = b[blockType] as { rich_text?: Array<{ type?: string; text?: { content: string }; [key: string]: unknown }>; [key: string]: unknown }
      if (typeData?.rich_text) {
        const wasChanged = replacePlaceholdersInRichText(typeData.rich_text, replacements)
        if (wasChanged) {
          changed.push({
            id: b.id as string,
            payload: { [blockType]: omitNulls({ ...typeData, rich_text: typeData.rich_text } as Record<string, unknown>) },
          })
        }
      }
    } else if (blockType === 'table_row') {
      const tableRow = b.table_row as { cells: Array<Array<{ type?: string; text?: { content: string }; [key: string]: unknown }>> }
      if (tableRow?.cells) {
        let rowChanged = false
        const updatedCells = tableRow.cells.map(cell => {
          const cellChanged = replacePlaceholdersInRichText(cell, replacements)
          if (cellChanged) rowChanged = true
          return cell
        })
        if (rowChanged) {
          changed.push({
            id: b.id as string,
            payload: { table_row: { cells: updatedCells } },
          })
        }
      }
    }

    if (b.__children && Array.isArray(b.__children)) {
      changed.push(...collectChangedBlocks(b.__children, replacements))
    }
  }

  return changed
}

export async function duplicateAndPopulateTemplate(
  result: AssessmentResult,
  contact: ContactData,
  aiContent: ClaudeResponse
): Promise<string> {
  const templateId = NOTION_TEMPLATE_IDS[result.outcomeBucket]
  const today = new Date().toISOString().split('T')[0]
  const bars = buildScoreBars(result.pillarScores, result.totalScore)

  const replacements: Record<string, string> = {
    NAME: contact.name,
    AGENCY: contact.businessName,
    TEAMSIZE: contact.teamSize ?? '',
    DATE: today,
    P1: String(result.pillarScores.p1),
    P2: String(result.pillarScores.p2),
    P3: String(result.pillarScores.p3),
    P4: String(result.pillarScores.p4),
    P5: String(result.pillarScores.p5),
    P6: String(result.pillarScores.p6),
    TOTAL: String(result.totalScore),
    P1_BAR: bars.P1_BAR,
    P2_BAR: bars.P2_BAR,
    P3_BAR: bars.P3_BAR,
    P4_BAR: bars.P4_BAR,
    P5_BAR: bars.P5_BAR,
    P6_BAR: bars.P6_BAR,
    TOTAL_BAR: bars.TOTAL_BAR ?? '',
    BOOKING_LINK: BOOKING_LINK,
    AI_KNOW_YOUR_WORLD: aiContent.AI_KNOW_YOUR_WORLD,
    AI_BOTTLENECK_1: aiContent.AI_BOTTLENECK_1,
    AI_BOTTLENECK_2: aiContent.AI_BOTTLENECK_2,
    AI_QUICK_WIN: aiContent.AI_QUICK_WIN,
  }

  // Step 1: Create page with native template application
  const newPage = await notionPost('/pages', {
    parent: { type: 'database_id', database_id: NOTION_DATABASE_ID },
    properties: {
      Name: {
        title: [{ text: { content: `${contact.businessName} — Agency Audit` } }],
      },
    },
    ...(templateId ? { template: { type: 'template_id', template_id: templateId } } : {}),
  }) as Record<string, unknown>

  const newPageId = newPage.id as string
  const newPageUrl = (newPage as { url?: string }).url ?? `https://notion.so/${newPageId.replace(/-/g, '')}`

  // Step 2: Poll until template blocks are ready
  if (templateId) {
    await pollForBlocks(newPageId)
  }

  // Step 3: Fetch all blocks recursively (200ms delay between child fetches)
  const blocks = await fetchAllBlocks(newPageId)

  // Step 4: Collect all blocks that need placeholder replacement
  const changedBlocks = collectChangedBlocks(blocks, replacements)

  // Step 5: PATCH each changed block with 50ms delay between calls
  for (const { id, payload } of changedBlocks) {
    await notionPatch(`/blocks/${id}`, payload)
    await sleep(50)
  }

  // Step 6: Update database properties
  const OUTCOME_BUCKET_LABELS: Record<string, string> = {
    'the-bottleneck': 'The Bottleneck',
    'the-firefighter': 'The Firefighter',
    'the-builder': 'The Builder',
    'the-operator': 'The Operator',
  }

  await notionPatch(`/pages/${newPageId}`, {
    properties: {
      Name: {
        title: [{ text: { content: `${contact.businessName} — Agency Audit` } }],
      },
      Email: { email: contact.email },
      Agency: { rich_text: [{ text: { content: contact.businessName } }] },
      'Submission Date': { date: { start: today } },
      'Outcome Bucket': { select: { name: OUTCOME_BUCKET_LABELS[result.outcomeBucket] ?? result.outcomeBucket } },
      'Primary Bottleneck': { select: { name: PILLAR_NAMES[result.lowestPillar] } },
      'P1 — Onboarding & Delivery': { number: result.pillarScores.p1 },
      'P2 — Visibility & Data': { number: result.pillarScores.p2 },
      'P3 — Client Performance & Reporting': { number: result.pillarScores.p3 },
      'P4 — Automation & Systems': { number: result.pillarScores.p4 },
      'P5 — B2B Growth': { number: result.pillarScores.p5 },
      'P6 — Team & Founder': { number: result.pillarScores.p6 },
      'Total Score': { number: result.totalScore },
      ...(contact.teamSize ? { 'Team Size': { select: { name: contact.teamSize } } } : {}),
    },
  })

  return newPageUrl
}
