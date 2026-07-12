function App() {
  return (
    <main className="min-h-screen bg-background-base p-8 font-app text-text-base">
      <div className="max-w-xl rounded-lg bg-background-highlight p-6">
        <h1 className="text-20px font-bold text-accent">
          tailwind configurado
        </h1>

        <p className="mt-2 text-12px font-medium text-text-subdued">
          inter 12px cinza.
        </p>

        <div className="mt-6 h-12 rounded bg-linear-to-r from-navbar-start to-navbar-end" />

        <div className="mt-6 h-1 rounded bg-track-bar">
          <div className="h-full w-1/2 rounded bg-accent" />
        </div>
      </div>
    </main>
  )
}

export default App