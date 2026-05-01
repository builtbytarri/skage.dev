const IMAGE = '/modern-african-american-man-working-caffe.jpg'

export default function App() {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row">
      {/* Left — Closed panel */}
      <div className="flex-1 lg:flex-none lg:w-[40%] flex flex-col bg-white overflow-y-auto">
        <div className="flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <img src="/logo.png" alt="Skage.dev" className="h-8 w-auto object-contain" />
          <span className="text-xs text-gray-400 font-medium">skage.dev</span>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <div className="max-w-[440px]">
            {/* Status badge */}
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Applications Closed
            </span>

            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              This application window<br />is now closed.
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              We've received all the applications we need for this round.
              Thank you to everyone who applied — we're currently reviewing submissions
              and will be in touch with shortlisted candidates.
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">What's next</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Stay tuned for updates on new opportunities at Skage.dev.
                Follow us or check back here for announcements.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F26522] flex items-center justify-center flex-shrink-0">
                <img src="/icon.png" alt="" className="w-5 h-5 object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Skage.dev</p>
                <p className="text-xs text-gray-400">Engineering tomorrow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Image panel (60%) */}
      <div className="hidden lg:block lg:w-[60%] relative overflow-hidden">
        <img
          src={IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-10">
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
            Sales Representative · Remote
          </p>
          <h2 className="text-white text-3xl font-bold leading-tight mb-5">
            Thank you to everyone<br />who applied.
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {['75 applications received', 'Review in progress', 'Shortlist coming soon'].map((tag) => (
              <span
                key={tag}
                className="bg-white/10 backdrop-blur-sm border border-white/15 text-white/90 text-xs px-3 py-1.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F26522] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p className="text-white/70 text-sm">
              Engineering tomorrow. <span className="text-white font-medium">skage.dev</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
