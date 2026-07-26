package com.catijr.backend.DTOs.Playlist;

import com.catijr.backend.Entities.Playlist;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record GetPlaylistNoMusicDTO(UUID id, String name, String description, int musicQtd,
                                    int duration, List<String> coverImageUrls,
                                    Instant createdAt, Instant updatedAt) {

    public GetPlaylistNoMusicDTO(Playlist playlist) {
        this(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                playlist.getMusicQtd(),
                playlist.getDuration(),
                getCoverImageUrls(playlist),
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