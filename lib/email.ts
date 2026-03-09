import { Resend } from 'resend'

let resend: Resend | null = null

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  return getResend().emails.send({
    from: 'Birthday RSVP <onboarding@resend.dev>',
    to,
    subject,
    html,
  })
}

export function getHostNotificationEmail(name: string, email: string, comment: string) {
  return {
    subject: `New RSVP: ${name}`,
    html: `
      <h2>New RSVP Received!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Comment:</strong> ${comment || 'No comment'}</p>
    `,
  }
}

export function getGuestConfirmationEmail(name: string, editUrl: string) {
  return {
    subject: 'Thanks for your RSVP!',
    html: `
      <h2>Thanks for RSVPing, ${name}!</h2>
      <p>We've received your response and can't wait to see you at the party!</p>
      <p>If you need to update your RSVP, you can do so here:</p>
      <p><a href="${editUrl}">${editUrl}</a></p>
    `,
  }
}

export function getGuestUpdateEmail(name: string, editUrl: string) {
  return {
    subject: 'Your RSVP has been updated',
    html: `
      <h2>RSVP Updated!</h2>
      <p>Hi ${name}, your RSVP has been successfully updated.</p>
      <p>If you need to make more changes, use this link:</p>
      <p><a href="${editUrl}">${editUrl}</a></p>
    `,
  }
}
