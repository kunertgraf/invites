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
    from: 'Birthday RSVP <rsvp@noreply.kunertgraf.com>',
    to,
    subject,
    html,
  })
}

interface RsvpDetails {
  attending: string
  name: string
  guests: string
  email: string
  comment: string
}

function rsvpSummary(rsvp: RsvpDetails) {
  return `
    <div style="background: #1a1a1a; border: 1px solid #525252; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #E55CE0; margin: 0 0 12px 0; font-size: 16px;">Your RSVP Details</h3>
      <p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #a3a3a3;">Status:</strong> ${rsvp.attending === 'yes' ? '&#10003; Coming' : '&#10007; Can\'t Make It'}</p>
      <p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #a3a3a3;">Name:</strong> ${rsvp.name}</p>

      <p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #a3a3a3;">Email:</strong> ${rsvp.email}</p>
      ${rsvp.comment ? `<p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #a3a3a3;">Comment:</strong> ${rsvp.comment}</p>` : ''}
    </div>
  `
}

export function getHostNotificationEmail(rsvp: RsvpDetails) {
  const statusText = rsvp.attending === 'yes' ? 'Coming' : "Can't Make It"
  return {
    subject: `New RSVP: ${rsvp.name} (${statusText})`,
    html: `
      <h2>New RSVP Received!</h2>
      <p><strong>Name:</strong> ${rsvp.name}</p>
      <p><strong>Status:</strong> ${statusText}</p>

      <p><strong>Email:</strong> ${rsvp.email}</p>
      <p><strong>Comment:</strong> ${rsvp.comment || 'No comment'}</p>
    `,
  }
}

const partyDetails = `
  <div style="background: #262626; border: 1px solid #525252; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #E55CE0; margin: 0 0 12px 0; font-size: 18px;">Rachel's Birthday</h3>
    <p style="color: #d4d4d4; margin: 4px 0;"><strong style="color: #00d4ff;">Saturday, April 11</strong></p>
    <p style="color: #d4d4d4; margin: 4px 0;">Drinks and karaoke at <a href="https://maps.google.com/?q=Boombox+Bar+Seattle" style="color: #E55CE0;">Boombox</a></p>
    <p style="color: #d4d4d4; margin: 4px 0;">6pm til late</p>
  </div>
`

export function getGuestConfirmationEmail(rsvp: RsvpDetails, editUrl: string) {
  const isComing = rsvp.attending === 'yes'
  return {
    subject: isComing ? "You're invited to Rachel's Birthday!" : "We'll miss you at Rachel's Birthday!",
    html: `
      <h2>${isComing ? `Thanks for RSVPing, ${rsvp.name}!` : `Sorry you can't make it, ${rsvp.name}!`}</h2>
      <p>${isComing ? "We've received your response and can't wait to see you at the party!" : "We'll miss you! If your plans change, you can always update your RSVP."}</p>
      ${partyDetails}
      ${rsvpSummary(rsvp)}
      <p>If you need to update your RSVP, you can do so here:</p>
      <p><a href="${editUrl}">${editUrl}</a></p>
    `,
  }
}

export function getGuestUpdateEmail(rsvp: RsvpDetails, editUrl: string) {
  const isComing = rsvp.attending === 'yes'
  return {
    subject: 'Your RSVP has been updated',
    html: `
      <h2>RSVP Updated!</h2>
      <p>${isComing ? `Hi ${rsvp.name}, your RSVP has been updated. See you at the party!` : `Hi ${rsvp.name}, your RSVP has been updated. We'll miss you!`}</p>
      ${partyDetails}
      ${rsvpSummary(rsvp)}
      <p>If you need to make more changes, use this link:</p>
      <p><a href="${editUrl}">${editUrl}</a></p>
    `,
  }
}
