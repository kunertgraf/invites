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

const partyDetails = `
  <div style="background: #262626; border: 1px solid #525252; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #fbbf24; margin: 0 0 12px 0; font-size: 18px;">Rachel's Birthday</h3>
    <p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #fbbf24;">Saturday, April 11</strong></p>
    <p style="color: #d4d4d4; margin: 4px 0;">7pm — Dinner at <a href="https://maps.google.com/?q=Seoul+Mates+954+E+Union+St+Seattle" style="color: #fbbf24;">Seoul Mates</a> (954 E Union St)</p>
    <p style="color: #d4d4d4; margin: 4px 0;">9pm — Karaoke at <a href="https://maps.google.com/?q=Rock+Box+1603+Nagle+Pl+Seattle" style="color: #fbbf24;">Rock Box</a> (1603 Nagle Pl)</p>
  </div>
`

export function getGuestConfirmationEmail(name: string, editUrl: string) {
  return {
    subject: "You're invited to Rachel's Birthday!",
    html: `
      <h2>Thanks for RSVPing, ${name}!</h2>
      <p>We've received your response and can't wait to see you at the party!</p>
      ${partyDetails}
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
      ${partyDetails}
      <p>If you need to make more changes, use this link:</p>
      <p><a href="${editUrl}">${editUrl}</a></p>
    `,
  }
}
