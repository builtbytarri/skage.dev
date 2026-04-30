import ApplicationForm from './components/ApplicationForm'
import SuccessScreen from './components/SuccessScreen'
import { useState } from 'react'

const IMAGE = '/modern-african-american-man-working-caffe.jpg'

export default function App() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row">
      {/* Left — Form panel */}
      <div className="flex-1 lg:max-w-[520px] xl:max-w-[560px] flex flex-col bg-white overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <img src="/logo.png" alt="Skage.dev" className="h-8 w-auto object-contain" />
          <span className="text-xs text-gray-400 font-medium">skage.dev</span>
        </div>

        {/* Form or success */}
        <div className="flex-1 flex flex-col justify-center px-8 py-6 pb-10">
          {submitted ? (
            <SuccessScreen />
          ) : (
            <ApplicationForm onSubmitted={() => setSubmitted(true)} />
          )}
        </div>
      </div>

      {/* Right — Image panel (desktop only) */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src={IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Hiring badge */}
        <div className="absolute top-8 right-8">
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
            Hiring Now
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-3">
            Sales Representative · Remote
          </p>
          <h2 className="text-white text-3xl font-bold leading-tight mb-5">
            Get paid to talk<br />to business owners.
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {['₦50k–₦200k per deal', 'No experience needed', 'Training provided'].map((tag) => (
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
