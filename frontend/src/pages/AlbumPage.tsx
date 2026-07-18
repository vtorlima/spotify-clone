import { useParams } from 'react-router-dom'

export default function AlbumPage() {
  const { albumId } = useParams()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Álbum</h2>
      <p className="text-gray-400">ID recebido da URL: {albumId}</p>
    </div>
  )
}