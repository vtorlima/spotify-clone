import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Página não encontrada</h2>
      <Link to="/" className="text-brand underline">Voltar ao início</Link>
    </div>
  )
}