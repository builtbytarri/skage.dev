import ApplicationForm from './components/ApplicationForm'

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col">
      <main className="flex-1 flex flex-col justify-center py-8">
        <ApplicationForm />
      </main>
    </div>
  )
}
