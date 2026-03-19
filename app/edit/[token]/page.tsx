import { notFound } from 'next/navigation'
import RsvpForm from '@/components/rsvp-form'
import { findRsvpByToken } from '@/lib/google-sheets'

interface EditPageProps {
  params: Promise<{ token: string }>
}

export default async function EditPage({ params }: EditPageProps) {
  const { token } = await params
  const rsvp = await findRsvpByToken(token)

  if (!rsvp) {
    notFound()
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-950/90 shadow-2xl p-8" style={{ border: '4px solid #E55CE0' }}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✏️</div>
            <h1 className="text-3xl font-bold mb-2 neon-title" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Edit Your RSVP
            </h1>
            <p className="text-neutral-400">
              Update your response below
            </p>
          </div>
          <RsvpForm
            initialData={{
              attending: rsvp.attending,
              name: rsvp.name,
              email: rsvp.email,
              comment: rsvp.comment,
            }}
            token={token}
          />
        </div>
      </div>
    </main>
  )
}
