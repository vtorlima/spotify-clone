package com.catijr.backend.DTOs.Playlist;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Entities.Playlist;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record GetPlaylistDTO(UUID id, String name, String description, int musicQtd,
                             int duration, List<String> coverImageUrls,
                             List<GetMusicDTO> musics,
                             Instant createdAt, Instant updatedAt) {

    public GetPlaylistDTO(Playlist playlist) {
        this(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                playlist.getMusicQtd(),
                playlist.getDuration(),
                getCoverImageUrls(playlist),
                playlist.getSongs().stream().map(song -> new GetMusicDTO(song)).toList(),
                playlist.getCreatedAt(),
                playlist.getUpdatedAt()
        );
    }

    private static List<String> getCoverImageUrls(Playlist playlist) {
        if (playlist.getSongs() == null || playlist.getSongs().isEmpty()) {
            return List.of();
        }

        if (playlist.getSongs().size() < 4) {
            return List.of(playlist.getSongs().get(0).getAlbum().getCoverUrl());
        }

        return playlist.getSongs()
                .stream()
                .limit(4)
                .map(music -> music.getAlbum().getCoverUrl())
                .toList();
    }
}