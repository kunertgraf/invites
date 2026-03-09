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
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✏️</div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              Edit Your RSVP
            </h1>
            <p className="text-gray-600">
              Update your response below
            </p>
          </div>
          <RsvpForm
            initialData={{
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
