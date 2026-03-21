import nodemailer from 'nodemailer'
import type { AssessmentResult, ContactData } from './types'
import { EMAIL_SUBJECT, buildEmailHtml } from '@/config/email'

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
    from: `"Andreas The Systems Guy" <${process.env.SMTP_FROM}>`,
    to: options.to,
    subject: EMAIL_SUBJECT,
    html,
  })
}
