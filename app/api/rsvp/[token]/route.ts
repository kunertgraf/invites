import { NextRequest, NextResponse } from 'next/server'
import { findRsvpByToken, updateRsvp } from '@/lib/google-sheets'
import { sendEmail, getGuestUpdateEmail } from '@/lib/email'

interface RouteContext {
  params: Promise<{ token: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { token } = await context.params
    const rsvp = await findRsvpByToken(token)

    if (!rsvp) {
      return NextResponse.json(
        { error: 'RSVP not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      name: rsvp.name,
      guests: rsvp.guests,
      email: rsvp.email,
      comment: rsvp.comment,
    })
  } catch (error) {
    console.error('Error fetching RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVP' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { token } = await context.params
    const { name, guests, email, comment } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const existingRsvp = await findRsvpByToken(token)

    if (!existingRsvp || !existingRsvp.rowIndex) {
      return NextResponse.json(
        { error: 'RSVP not found' },
        { status: 404 }
      )
    }

    const timestamp = new Date().toISOString()

    await updateRsvp(existingRsvp.rowIndex, {
      name,
      guests: guests || '1',
      email,
      comment: comment || '',
      token,
      timestamp,
    })

    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || ''
    const editUrl = `${baseUrl}/edit/${token}`

    const updateEmail = getGuestUpdateEmail(name, editUrl)
    await sendEmail({
      to: email,
      subject: updateEmail.subject,
      html: updateEmail.html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to update RSVP' },
      { status: 500 }
    )
  }
}
