import RsvpForm from '@/components/rsvp-form'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.squarespace-cdn.com/content/v1/5f9364c2a3f630234e5835f5/f88e4812-0a71-4baf-9a19-20a11a61476b/slide0.jpg')" }}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-neutral-950/90 shadow-2xl p-8" style={{ border: '4px solid #E55CE0' }}>
          <div className="text-center mb-8">
            <img src="/karaoke.gif" alt="Karaoke" className="mx-auto mb-4 h-28" style={{ mixBlendMode: 'screen', filter: 'contrast(1.5) brightness(1.2)' }} />
            <p className="text-2xl text-neutral-300 mb-1 font-light tracking-wide" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              you're invited to
            </p>
            <h1 className="text-5xl tracking-widest neon-title" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
              RACHEL'S BIRTHDAY
            </h1>
            <div className="mt-6 space-y-2 text-neutral-300 text-sm">
              <p className="font-semibold uppercase tracking-widest text-sm neon-blue">Saturday, April 11</p>
              <p className="italic text-neutral-400 text-sm">hosted by James</p>
              <p>
                <span className="text-lg text-neutral-400 font-light">drinks and karaoke at </span>
                <a href="https://maps.google.com/?q=Boombox+Bar+Seattle" target="_blank" rel="noopener noreferrer" className="neon-blue tracking-widest underline underline-offset-4 hover:brightness-125" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: 700 }}>BOOMBOX</a>
              </p>
              <p className="text-neutral-400 text-sm">6pm til late</p>
            </div>
          </div>
          <RsvpForm />
          <p className="text-center text-neutral-700 text-xs mt-6">website by James (actually by Claude sorry)</p>
        </div>
      </div>
    </main>
  )
}
