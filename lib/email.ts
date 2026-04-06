import { Resend } from 'resend'
import type { AssessmentResult, ContactData } from './types'
import { EMAIL_SUBJECT, buildEmailHtml } from '@/config/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAuditEmail(options: {
  to: string
  name: string
  result: AssessmentResult
  contact: ContactData
  notionPageUrl: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured — skipping email send')
    return
  }
  const html = buildEmailHtml(options.result, options.contact, options.notionPageUrl)
  await resend.emails.send({
    from: `Andreas, the systems guy <${process.env.SMTP_FROM}>`,
    to: options.to,
    subject: EMAIL_SUBJECT,
    html,
  })
}

/*
// nodemailer SMTP version (kept for reference — Hetzner blocks outbound SMTP ports)
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendAuditEmail(options: {
  to: string
  name: string
  result: AssessmentResult
  contact: ContactData
  notionPageUrl: string
}): Promise<void> {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured — skipping email send')
    return
  }
  const html = buildEmailHtml(options.result, options.contact, options.notionPageUrl)
  await transporter.sendMail({
    from: `"Andreas, the systems guy" <${process.env.SMTP_FROM}>`,
    to: options.to,
    subject: EMAIL_SUBJECT,
    html,
  })
}
*/
