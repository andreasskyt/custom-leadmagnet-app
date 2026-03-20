import type { OutcomeBucket } from '@/lib/types'

// Notion database where all audit submissions are stored
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ''

// Notion data source ID (for future use)
export const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID ?? ''

// One template page per outcome bucket — duplicate these for each submission
export const NOTION_TEMPLATE_IDS: Record<OutcomeBucket, string> = {
  'the-bottleneck':  process.env.NOTION_TEMPLATE_BOTTLENECK ?? '',
  'the-firefighter': process.env.NOTION_TEMPLATE_FIREFIGHTER ?? '',
  'the-builder':     process.env.NOTION_TEMPLATE_BUILDER ?? '',
  'the-operator':    process.env.NOTION_TEMPLATE_OPERATOR ?? '',
}

export const NOTION_API_VERSION = '2022-06-28'
export const NOTION_API_BASE = 'https://api.notion.com/v1'
