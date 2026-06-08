package com.catijr.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.catijr.backend.DTOs.Album.GetAlbumNoMusicsDTO;
import com.catijr.backend.DTOs.Artist.GetArtistDTO;
import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistNoMusicDTO;
import com.catijr.backend.Entities.Album;
import com.catijr.backend.Entities.Artist;
import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Repositories.AlbumRepository;
import com.catijr.backend.Repositories.ArtistRepository;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.Repositories.PlaylistRepository;
import com.catijr.backend.Mappers.AlbumMapper;
import com.catijr.backend.Mappers.ArtistMapper;
import com.catijr.backend.Mappers.MusicMapper;
import com.catijr.backend.Mappers.PlaylistMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final AlbumRepository       albumRepository;
    private final MusicRepository       musicRepository;
    private final PlaylistRepository    playlistRepository;
    private final ArtistRepository      artistRepository;

    private final AlbumMapper           albumMapper;
    private final PlaylistMapper        playlistMapper;
    private final ArtistMapper          artistMapper;
    private final MusicMapper           musicMapper;


    public List<GetPlaylistNoMusicDTO> getUserPlaylists(){
        List<Playlist> albums = playlistRepository.findAll();
        
        return albums.stream().map(playlistMapper::toDTO).toList();
    }

    public List<GetArtistDTO> getUserRecentArtists(){
        List<Artist> artists = artistRepository.findTop5By();

        return artists.stream().map(artistMapper::toDTO).toList();   
    }

    public List<GetArtistDTO> getUserMostPlayedArtists(){
        List<Artist> artists = artistRepository.findTop5ByOrderByListenersDesc();
        
        return artists.stream().map(artistMapper::toDTO).toList();
    }

    public List<GetMusicDTO> getUserRecentMusics(){
        List<Music> musics = musicRepository.findTop5By();

        return musics.stream().map(musicMapper::toDTO).toList();
    }

    public List<GetMusicDTO> getUserMostPlayedMusics(){
        List<Music> musics = musicRepository.findTop5ByOrderByTimesListenDesc();

        return musics.stream().map(musicMapper::toDTO).toList();
    }

    public List<GetAlbumNoMusicsDTO> getUserRecentAlbums(){
        List<Album> albums= albumRepository.findTop5By();

        return albums.stream().map(albumMapper::toNoMusicsDTO).toList();
    }








}
