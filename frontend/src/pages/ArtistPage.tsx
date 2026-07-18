import { useParams } from 'react-router-dom'

export default function ArtistPage() {
  const { artistId } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Artista</h2>
      <p className="text-gray-400">ID recebido da URL: {artistId}</p>
    </div>
  )
}