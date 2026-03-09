import RsvpForm from '@/components/rsvp-form'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎂</div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">
              You're Invited!
            </h1>
            <p className="text-gray-600">
              Please RSVP to let us know you're coming
            </p>
          </div>
          <RsvpForm />
        </div>
      </div>
    </main>
  )
}
