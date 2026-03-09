import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/tokens'
import { appendRsvp } from '@/lib/google-sheets'
import { sendEmail, getHostNotificationEmail, getGuestConfirmationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { attending, name, guests, email, comment } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const token = generateToken()
    const timestamp = new Date().toISOString()

    await appendRsvp({ attending: attending || 'yes', name, guests: guests || '1', email, comment: comment || '', token, timestamp })

    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || ''
    const editUrl = `${baseUrl}/edit/${token}`

    const rsvpDetails = { attending: attending || 'yes', name, guests: guests || '1', email, comment: comment || '' }

    const hostEmail = getHostNotificationEmail(rsvpDetails)
    await sendEmail({
      to: process.env.HOST_EMAIL!,
      subject: hostEmail.subject,
      html: hostEmail.html,
    })

    const guestEmail = getGuestConfirmationEmail(rsvpDetails, editUrl)
    await sendEmail({
      to: email,
      subject: guestEmail.subject,
      html: guestEmail.html,
    })

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to create RSVP' },
      { status: 500 }
    )
  }
}
