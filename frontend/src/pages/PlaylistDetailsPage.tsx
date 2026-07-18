import { useParams } from 'react-router-dom'

export default function PlaylistDetailsPage() {
  const { playlistId } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Detalhes da Playlist</h2>
      <p className="text-gray-400">ID recebido da URL: {playlistId}</p>
    </div>
  )
}