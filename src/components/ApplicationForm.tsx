import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'

const schema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  phone: z.string().min(10, 'Enter a valid WhatsApp number'),
  email: z.string().email('Enter a valid email').or(z.literal('')).optional(),
  city: z.string().min(2, 'Enter your city'),
  hasSalesExp: z.enum(['yes', 'no']),
  salesExpDetail: z.string().optional(),
  callComfort: z.enum(['yes', 'somewhat', 'no']),
  hoursPerDay: z.enum(['1-2', '2-4', '4+']),
  hasStableInternet: z.enum(['yes', 'no']),
  whyInterested: z.string().min(10, 'Please tell us why — at least 10 characters').max(150),
  incomeGoal: z.string().min(1, 'Select or enter your income goal'),
  commissionOk: z.enum(['yes', 'no']),
})

type FormData = z.infer<typeof schema>

const STEPS = ['Basic Info', 'Experience', 'Availability', 'Intent']

const STEP_FIELDS: (keyof FormData)[][] = [
  ['fullName', 'phone', 'city'],
  ['hasSalesExp', 'callComfort'],
  ['hoursPerDay', 'hasStableInternet'],
  ['whyInterested', 'incomeGoal', 'commissionOk'],
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-red-500 text-xs mt-1.5">{message}</p>
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {children}
      {required && <span className="text-[#F26522] ml-0.5">*</span>}
    </label>
  )
}

// font-size set to 16px via global CSS to prevent iOS zoom
const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F26522]/25 focus:border-[#F26522] transition-all duration-150 bg-white leading-normal'

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
            value === opt.value
              ? 'border-[#F26522] bg-[#F26522]/5 text-[#F26522]'
              : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function Step1({ form }: { form: ReturnType<typeof useForm<FormData>> }) {
  const { register, formState: { errors } } = form
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label required>Full Name</Label>
        <input {...register('fullName')} placeholder="Amara Johnson" className={inputClass} />
        <FieldError message={errors.fullName?.message} />
      </div>
      <div>
        <Label required>WhatsApp Number</Label>
        <input {...register('phone')} placeholder="+234 800 000 0000" type="tel" className={inputClass} />
        <FieldError message={errors.phone?.message} />
      </div>
      <div>
        <Label>
          Email Address{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </Label>
        <input {...register('email')} placeholder="you@example.com" type="email" className={inputClass} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <Label required>City</Label>
        <input {...register('city')} placeholder="Lagos" className={inputClass} />
        <FieldError message={errors.city?.message} />
      </div>
    </div>
  )
}

function Step2({ form }: { form: ReturnType<typeof useForm<FormData>> }) {
  const { register, watch, setValue, formState: { errors } } = form
  const hasSalesExp = watch('hasSalesExp')
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label required>Have you ever done sales before?</Label>
        <RadioGroup
          options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
          value={hasSalesExp}
          onChange={(v) => setValue('hasSalesExp', v as 'yes' | 'no', { shouldValidate: true })}
        />
        <FieldError message={errors.hasSalesExp?.message} />
      </div>

      {hasSalesExp === 'yes' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Label>Briefly describe your experience</Label>
          <textarea
            {...register('salesExpDetail')}
            placeholder="e.g. Sold mobile data plans to shops for 6 months..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </motion.div>
      )}

      <div>
        <Label required>Are you comfortable talking to business owners on calls?</Label>
        <RadioGroup
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'Somewhat', value: 'somewhat' },
            { label: 'No', value: 'no' },
          ]}
          value={watch('callComfort')}
          onChange={(v) => setValue('callComfort', v as 'yes' | 'somewhat' | 'no', { shouldValidate: true })}
        />
        <FieldError message={errors.callComfort?.message} />
      </div>
    </div>
  )
}

function Step3({ form }: { form: ReturnType<typeof useForm<FormData>> }) {
  const { watch, setValue, formState: { errors } } = form
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label required>How many hours per day can you commit?</Label>
        <RadioGroup
          options={[
            { label: '1–2 hours', value: '1-2' },
            { label: '2–4 hours', value: '2-4' },
            { label: '4+ hours', value: '4+' },
          ]}
          value={watch('hoursPerDay')}
          onChange={(v) => setValue('hoursPerDay', v as '1-2' | '2-4' | '4+', { shouldValidate: true })}
        />
        <FieldError message={errors.hoursPerDay?.message} />
      </div>
      <div>
        <Label required>Do you have a stable phone and internet access?</Label>
        <RadioGroup
          options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
          value={watch('hasStableInternet')}
          onChange={(v) => setValue('hasStableInternet', v as 'yes' | 'no', { shouldValidate: true })}
        />
        <FieldError message={errors.hasStableInternet?.message} />
      </div>
    </div>
  )
}

function Step4({ form }: { form: ReturnType<typeof useForm<FormData>> }) {
  const { register, watch, setValue, formState: { errors } } = form
  const INCOME_OPTIONS = ['₦50,000', '₦100,000', '₦200,000+']
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label required>Why are you interested in this opportunity?</Label>
        <textarea
          {...register('whyInterested')}
          placeholder="Be honest — what's driving you to apply?"
          rows={3}
          maxLength={150}
          className={`${inputClass} resize-none`}
        />
        <div className="flex justify-between items-start mt-1.5">
          <FieldError message={errors.whyInterested?.message} />
          <span className="text-xs text-gray-400 ml-auto">
            {(watch('whyInterested') || '').length}/150
          </span>
        </div>
      </div>
      <div>
        <Label required>Income goal for the next 30 days?</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {INCOME_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue('incomeGoal', opt, { shouldValidate: true })}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
                watch('incomeGoal') === opt
                  ? 'border-[#F26522] bg-[#F26522]/5 text-[#F26522]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <input
          {...register('incomeGoal')}
          placeholder="Or type your own goal..."
          className={inputClass}
        />
        <FieldError message={errors.incomeGoal?.message} />
      </div>
      <div>
        <Label required>This role is commission-based. Are you okay earning based on performance?</Label>
        <RadioGroup
          options={[
            { label: 'Yes, I understand', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          value={watch('commissionOk')}
          onChange={(v) => setValue('commissionOk', v as 'yes' | 'no', { shouldValidate: true })}
        />
        <FieldError message={errors.commissionOk?.message} />
      </div>
    </div>
  )
}

interface Props {
  onSubmitted: () => void
}

export default function ApplicationForm({ onSubmitted }: Props) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '', phone: '', email: '', city: '',
      hasSalesExp: undefined, salesExpDetail: '',
      callComfort: undefined, hoursPerDay: undefined,
      hasStableInternet: undefined, whyInterested: '',
      incomeGoal: '', commissionOk: undefined,
    },
  })

  const isLast = step === STEPS.length - 1

  const next = async () => {
    const valid = await form.trigger(STEP_FIELDS[step])
    if (!valid) return
    setDir(1)
    setStep((s) => s + 1)
  }

  const back = () => {
    setDir(-1)
    setStep((s) => s - 1)
  }

  const onSubmit = form.handleSubmit(() => {
    onSubmitted()
  })

  return (
    <div className="w-full max-w-[440px]">
      {/* Role header */}
      <div className="mb-8">
        <p className="text-xs text-[#F26522] font-semibold uppercase tracking-widest mb-1.5">
          Now Hiring
        </p>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Sales Representative
        </h1>
        <p className="text-sm text-gray-500 mt-1">Remote · Commission-based · Nigeria</p>
      </div>

      {/* Progress */}
      <div className="mb-7">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500">{STEPS[step]}</span>
          <span className="text-xs text-gray-400">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#F26522] rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="overflow-hidden mb-6">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <FormProvider {...form}>
              {step === 0 && <Step1 form={form} />}
              {step === 1 && <Step2 form={form} />}
              {step === 2 && <Step3 form={form} />}
              {step === 3 && <Step4 form={form} />}
            </FormProvider>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Go back
          </button>
        )}
        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#D95A1A] text-white text-sm font-semibold transition-colors duration-200"
          >
            Submit application
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="flex-1 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#D95A1A] text-white text-sm font-semibold transition-colors duration-200"
          >
            Continue
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-5">
        Takes less than 2 minutes to complete.
      </p>
    </div>
  )
}
