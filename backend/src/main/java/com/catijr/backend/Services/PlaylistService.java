package com.catijr.backend.Services;


import com.catijr.backend.DTOs.Playlist.CreatePlaylistDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistNoMusicDTO;
import com.catijr.backend.DTOs.Playlist.PutPlaylistDTO;
import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;
import com.catijr.backend.Repositories.MusicRepository;
import com.catijr.backend.Repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MusicRepository musicRepository;

    public Playlist getPlaylistById(UUID playlistId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return playlist;
    }

    public Playlist editPlaylistAttributes(UUID playlistId, PutPlaylistDTO changesDTO) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (changesDTO.name() != null) {
            playlist.setName(changesDTO.name());
        }

        if (changesDTO.description() != null) {
            playlist.setDescription(changesDTO.description());
        }

        var edited = playlistRepository.save(playlist);

        return edited;
    }

    public Playlist addMusicToPlaylist(UUID playlistId, UUID musicId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!playlistRepository.musicExistsById(playlistId, musicId)) {
            var music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            List<Music> musics = new ArrayList<>(playlist.getSongs());

            musics.add(music);

            playlist.setSongs(musics);
            playlist.setMusicQtd(playlist.getMusicQtd() + 1);
            playlist.setDuration(playlist.getDuration() + music.getDuration());

            var updated = playlistRepository.save(playlist);

            return updated;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }
  
    public GetPlaylistNoMusicDTO createPlaylist(CreatePlaylistDTO dto){
        Playlist playlistEntity = Playlist.builder()
                .name(dto.name())
                .description(dto.description())
                .songs(new ArrayList<>())
                .musicQtd(0)
                .duration(0)
                .build();

        Playlist savedEntity = playlistRepository.save(playlistEntity);

        return new GetPlaylistNoMusicDTO(savedEntity);
    }


    public void deletePlaylistById(UUID playlistId) {
        if (playlistRepository.existsById(playlistId)) {
            playlistRepository.deleteById(playlistId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public void deleteMusicById(UUID playlistId, UUID musicId) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (playlistRepository.musicExistsById(playlistId, musicId)) {
            var music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            List<Music> musics = new ArrayList<>(playlist.getSongs());

            musics.removeIf(tgt_music -> tgt_music.getId().equals(musicId));

            playlist.setMusicQtd(playlist.getMusicQtd() - 1);
            playlist.setDuration(playlist.getDuration() - music.getDuration());

            playlist.setSongs(musics);

            playlistRepository.save(playlist);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public Playlist reorderPlaylistMusics(UUID playlistId, List<UUID> orderedMusicIds) {
        var playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // Defensivo: em playlists carregadas o Hibernate já devolve lista (possivelmente vazia).
        List<Music> current = playlist.getSongs() != null
                ? playlist.getSongs()
                : new ArrayList<>();

        // A nova ordem precisa ser exatamente o mesmo conjunto de músicas (sem somar/remover).
        Set<UUID> currentIds = current.stream().map(Music::getId).collect(Collectors.toSet());
        if (orderedMusicIds.size() != current.size()
                || !currentIds.equals(new HashSet<>(orderedMusicIds))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Map<UUID, Music> byId = current.stream()
                .collect(Collectors.toMap(Music::getId, music -> music));

        List<Music> reordered = orderedMusicIds.stream()
                .map(byId::get)
                .collect(Collectors.toList());

        playlist.setSongs(reordered);

        return playlistRepository.save(playlist);
    }
}
