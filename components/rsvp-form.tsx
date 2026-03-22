'use client'

import { useState } from 'react'

interface RsvpFormProps {
  initialData?: {
    attending: string
    name: string
    email: string
    comment: string
  }
  token?: string
}

export default function RsvpForm({ initialData, token }: RsvpFormProps) {
  const [attending, setAttending] = useState(initialData?.attending || 'yes')
  const [name, setName] = useState(initialData?.name || '')

  const [email, setEmail] = useState(initialData?.email || '')
  const [comment, setComment] = useState(initialData?.comment || '')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const isEdit = !!token

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const url = isEdit ? `/api/rsvp/${token}` : '/api/rsvp'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attending, name, email, comment }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      setStatus('success')
      setMessage(isEdit ? 'Your RSVP has been updated!' : 'Thanks for your RSVP! Check your email for confirmation.')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2 neon-title" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {isEdit ? 'Updated!' : "You're all set!"}
        </h2>
        <p className="text-neutral-300">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isEdit && (
        <p className="text-white text-sm text-center mb-2 px-4">
          Rachel is a thoughtful and caring friend. Her deep empathy and curiousity for others inspire me every day. Let's celebrate her with drinks and karaoke! Come by Boombox any time after 6 and stay for as long as you'd like (we'll be there until late but you may want to leave early once you hear our singing voices).
        </p>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem' }}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-none text-neutral-100 placeholder-neutral-600 neon-input"
          placeholder="Your name"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setAttending('yes')}
          className={`flex-1 py-2 px-4 rounded-none font-semibold text-sm transition-all border ${
            attending === 'yes'
              ? 'border-pink-500 text-white'
              : 'bg-neutral-900 border-neutral-700 text-neutral-500 hover:border-neutral-600'
          }`}
          style={attending === 'yes' ? { background: 'linear-gradient(135deg, #E55CE0, #F0A0ED)', boxShadow: '0 0 15px rgba(255, 45, 123, 0.4)' } : {}}
        >
          {attending === 'yes' && <span className="mr-1">&#10003;</span>}Coming
        </button>
        <button
          type="button"
          onClick={() => setAttending('no')}
          className={`flex-1 py-2 px-4 rounded-none font-semibold text-sm transition-all border ${
            attending === 'no'
              ? 'bg-neutral-700 border-neutral-600 text-white'
              : 'bg-neutral-900 border-neutral-700 text-neutral-500 hover:border-neutral-600'
          }`}
        >
          {attending === 'no' && <span className="text-red-400 mr-1">&#10007;</span>}Can't Make It
        </button>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem' }}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-none text-neutral-100 placeholder-neutral-600 neon-input"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-neutral-400 mb-1 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem' }}>
          Comment (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-none text-neutral-100 placeholder-neutral-600 neon-input"
          placeholder="Anything else?"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 px-4 text-white font-semibold rounded-none disabled:opacity-50 disabled:cursor-not-allowed neon-btn uppercase tracking-widest"
        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem' }}
      >
        {status === 'loading' ? 'Submitting...' : isEdit ? 'Update RSVP' : 'Submit RSVP'}
      </button>
    </form>
  )
}
