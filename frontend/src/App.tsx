// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlaylistsPage from './pages/PlaylistsPage'
import PlaylistDetailsPage from './pages/PlaylistDetailsPage'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="playlists" element={<PlaylistsPage />} />
        <Route path="playlist/:playlistId" element={<PlaylistDetailsPage />} />
        <Route path="artist/:artistId" element={<ArtistPage />} />
        <Route path="album/:albumId" element={<AlbumPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}