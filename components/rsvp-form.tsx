'use client'

import { useState } from 'react'

interface RsvpFormProps {
  initialData?: {
    name: string
    guests: string
    email: string
    comment: string
  }
  token?: string
}

export default function RsvpForm({ initialData, token }: RsvpFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [guests, setGuests] = useState(initialData?.guests || '1')
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
        body: JSON.stringify({ name, guests, email, comment }),
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
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          {isEdit ? 'Updated!' : 'You\'re all set!'}
        </h2>
        <p className="text-neutral-300">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-neutral-300 mb-1">
          Number of Guests (we need an exact count!)
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-neutral-300 mb-1">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Anything else?"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 px-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-500 focus:ring-4 focus:ring-amber-300/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? 'Submitting...' : isEdit ? 'Update RSVP' : 'Submit RSVP'}
      </button>
    </form>
  )
}
