import RsvpForm from '@/components/rsvp-form'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img src="/karaoke.gif" alt="Karaoke" className="mx-auto mb-4 h-40" style={{ mixBlendMode: 'screen', filter: 'contrast(1.8) brightness(1.1)' }} />
            <p className="text-2xl text-neutral-300 mb-1" style={{ fontFamily: "'Dancing Script', cursive" }}>
              you're invited to
            </p>
            <h1 className="text-5xl text-amber-400 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              RACHEL'S BIRTHDAY
            </h1>
            <div className="mt-6 space-y-2 text-neutral-300 text-sm">
              <p className="text-amber-400/80 font-semibold uppercase tracking-widest text-xs">Saturday, April 11</p>
              <p>
                <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-lg text-neutral-300">dinner at </span>
                <a href="https://maps.google.com/?q=Seoul+Mates+954+E+Union+St+Seattle" target="_blank" rel="noopener noreferrer" className="text-amber-400 tracking-wide underline underline-offset-4 hover:text-amber-300" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem' }}>SEOUL MATES</a>
                <span className="text-neutral-400"> — 7pm</span>
              </p>
              <p>
                <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-lg text-neutral-300">karaoke at </span>
                <a href="https://maps.google.com/?q=Rock+Box+1603+Nagle+Pl+Seattle" target="_blank" rel="noopener noreferrer" className="text-amber-400 tracking-wide underline underline-offset-4 hover:text-amber-300" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem' }}>ROCK BOX</a>
                <span className="text-neutral-400"> — 9pm</span>
              </p>
            </div>
          </div>
          <RsvpForm />
          <p className="text-center text-neutral-600 text-xs mt-6">website by James (actually by Claude sorry)</p>
        </div>
      </div>
    </main>
  )
}
