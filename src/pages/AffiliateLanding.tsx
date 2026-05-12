const WA = 'https://chat.whatsapp.com/JnwcgFWSIbuGudIhD49j1R?mode=gi_t'

function OrangeLine() {
  return <div className="w-8 h-0.5 bg-[#F26522] mb-6" />
}

function JoinButton({ label = 'Join the Team →' }: { label?: string }) {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center bg-[#F26522] hover:bg-[#D95A1A] text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200"
    >
      {label}
    </a>
  )
}

export default function AffiliateLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── Nav ── */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/logo.png" alt="Skage.dev" className="h-7 w-auto object-contain" />
          <JoinButton label="Join the Team →" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="py-20 md:py-28">
          <p className="text-xs text-[#F26522] font-semibold uppercase tracking-widest mb-4">
            Skage Affiliate Sales Team
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6">
            Earn on<br className="hidden md:block" /> Your Terms.
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
            The Skage Affiliate Sales Team is a performance-based opportunity for driven individuals who want to earn real commissions selling premium digital services — on their own schedule, at their own pace.
          </p>
          <JoinButton label="Join the Team →" />
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 1: What Is This ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">What is this?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <p className="text-gray-500 leading-relaxed">
              Skage.dev is a software development company building premium websites, SaaS platforms,
              and digital infrastructure for businesses across Nigeria and beyond.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The Affiliate Sales Team is an independent sales program. You represent Skage, reach out to
              businesses that need a digital presence, and earn a commission on every deal that closes.
            </p>
          </div>
          <p className="mt-6 text-sm font-semibold text-gray-900 tracking-wide">
            No salary. No ceiling. Just performance.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 2: What You'll Be Doing ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What you'll be doing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Reaching out to small and medium businesses via calls, DMs, or referrals',
              "Introducing them to Skage's web and digital services",
              'Booking interested leads for a follow-up meeting with the Skage team',
              'Following up on warm leads when needed',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#fafaf9] border border-gray-100 rounded-2xl p-5">
                <span className="w-6 h-6 rounded-lg bg-[#F26522]/10 text-[#F26522] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 italic">
            You don't need to close every deal yourself. Your job is to open the door.
          </p>
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 3: What You Get ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">What you get</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Competitive commission on every sale you generate',
              'Sales scripts and outreach templates to get you started',
              'Tips, resources, and periodic training to sharpen your skills',
              'Access to mentorship from the core sales team',
              'Performance bonuses for top earners',
              'A real path to joining the Core Team based on your results',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                <span className="text-[#F26522] font-bold text-base leading-none mt-0.5 flex-shrink-0">✦</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 4: Upgrade Path ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">The upgrade path</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                This is not a dead end. Affiliates who consistently perform will be considered for the
                Skage Core Sales Team — which comes with financial support, priority leads, closer mentorship,
                and higher earning potential.
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Your results speak for you. Show up, close deals, and the door opens.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col gap-3">
              {[
                { step: 'Start', label: 'Affiliate', desc: 'Commission on performance' },
                { step: 'Grow', label: 'Senior Affiliate', desc: 'Bonuses + priority leads' },
                { step: 'Earn', label: 'Core Sales Team', desc: 'Financial support + mentorship' },
              ].map((tier, i) => (
                <div key={i} className={`flex items-center gap-4 rounded-2xl p-4 border ${i === 2 ? 'border-[#F26522]/30 bg-[#F26522]/5' : 'border-gray-100 bg-[#fafaf9]'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${i === 2 ? 'bg-[#F26522] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${i === 2 ? 'text-[#F26522]' : 'text-gray-800'}`}>{tier.label}</p>
                    <p className="text-xs text-gray-400">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 5: Who This Is For ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Who this is for</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-4">This is for you if</p>
              <div className="flex flex-col gap-3">
                {[
                  "You're hungry, driven, and not afraid to pick up the phone",
                  "You want to earn without waiting for a salary",
                  "You believe in the product you're selling",
                  "You're ready to learn and grow fast",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="text-green-500 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">This is not for you if</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                You're looking for a passive or guaranteed income.
                This is performance-based, full stop.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        {/* ── Section 6: How It Works ── */}
        <section className="py-16 md:py-20">
          <OrangeLine />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">How it works</h2>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-100 hidden md:block" />
            <div className="flex flex-col gap-6">
              {[
                { n: '01', text: 'Join the affiliate WhatsApp group' },
                { n: '02', text: 'Receive your onboarding materials — scripts, tips, and service details' },
                { n: '03', text: 'Start reaching out to businesses in your network or area' },
                { n: '04', text: 'When a lead is interested, pass them over to the Skage team' },
                { n: '05', text: 'Deal closes → you earn your commission' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold z-10 ${i === 4 ? 'bg-[#F26522] text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                    {step.n}
                  </div>
                  <p className={`text-sm leading-relaxed pt-1.5 ${i === 4 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-400 tracking-wide">Simple. Clean. No bureaucracy.</p>
        </section>

      </main>

      {/* ── Footer CTA ── */}
      <footer className="bg-[#0f0f0f] mt-4">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <img src="/logo.png" alt="Skage.dev" className="h-7 w-auto object-contain mb-6 brightness-0 invert" />
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Ready to start earning?
            </h2>
            <p className="text-sm text-gray-400 max-w-sm">
              Join the group, get your materials, and make your first move.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#F26522] hover:bg-[#D95A1A] text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
            >
              Join the Affiliate Team →
            </a>
            <p className="text-xs text-gray-600 mt-3">Commission-based · Remote · Nigeria</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
