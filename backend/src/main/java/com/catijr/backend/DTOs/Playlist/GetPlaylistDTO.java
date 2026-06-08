package com.catijr.backend.DTOs.Playlist;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Entities.Playlist;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record GetPlaylistDTO(UUID id, String name, String description, int musicQtd,
                             int duration, List<GetMusicDTO> musics,
                             Instant createdAt, Instant updatedAt ) {

    public GetPlaylistDTO(Playlist playlist) {
        this(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                playlist.getMusicQtd(),
                playlist.getDuration(),
                playlist.getSongs().stream().map(song -> new GetMusicDTO(song)).toList(),
                playlist.getCreatedAt(),
                playlist.getUpdatedAt()
        );
    }
}
