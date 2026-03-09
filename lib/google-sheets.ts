import { google } from 'googleapis'

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() })
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!
const RANGE = 'Sheet1'

export interface RsvpRow {
  name: string
  guests: string
  email: string
  comment: string
  token: string
  timestamp: string
  rowIndex?: number
}

export async function appendRsvp(rsvp: Omit<RsvpRow, 'rowIndex'>): Promise<void> {
  const sheets = getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[rsvp.name, rsvp.guests, rsvp.email, rsvp.comment, rsvp.token, rsvp.timestamp]],
    },
  })
}

export async function findRsvpByToken(token: string): Promise<RsvpRow | null> {
  const sheets = getSheets()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  })

  const rows = response.data.values || []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (row[4] === token) {
      return {
        name: row[0],
        guests: row[1] || '1',
        email: row[2],
        comment: row[3],
        token: row[4],
        timestamp: row[5],
        rowIndex: i + 1,
      }
    }
  }
  return null
}

export async function updateRsvp(
  rowIndex: number,
  rsvp: Omit<RsvpRow, 'rowIndex'>
): Promise<void> {
  const sheets = getSheets()
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${RANGE}!A${rowIndex}:F${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[rsvp.name, rsvp.guests, rsvp.email, rsvp.comment, rsvp.token, rsvp.timestamp]],
    },
  })
}
