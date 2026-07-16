import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [dados, setDados] = useState<unknown>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/user/playlists`)
      .then((res) => res.json())
      .then((json) => setDados(json))
      .catch((e) => setErro(String(e)))
  }, [])

  return (
    <main className="min-h-screen bg-background-base p-8 font-app text-text-base">
      <h1 className="text-20px font-bold text-accent">Teste de conexão</h1>

      {erro && <p className="mt-2 text-12px text-text-subdued">Erro: {erro}</p>}

      <pre className="mt-4 overflow-auto rounded-lg bg-background-highlight p-4 text-12px text-text-subdued">
        {JSON.stringify(dados, null, 2)}
      </pre>
    </main>
  )
}

export default App