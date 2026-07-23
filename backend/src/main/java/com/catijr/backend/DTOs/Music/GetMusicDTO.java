package com.catijr.backend.DTOs.Music;

import com.catijr.backend.Entities.Music;
import com.catijr.backend.Entities.Playlist;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public record GetMusicDTO(UUID id, String title,
                          UUID artistId, String artistName,
                          UUID albumId, String albumTitle, String albumCoverUrl,
                          List<UUID> playlistsId,
                          int duration, Instant releaseDate, int timesListen,
                          Boolean explicit, Instant createdAt,
                          Instant updatedAt) {

    public GetMusicDTO(Music music) {
        this(
                music.getId(),
                music.getTitle(),
                music.getArtist().getId(),
                music.getArtist().getName(),
                music.getAlbum().getId(),
                music.getAlbum().getTitle(),
                music.getAlbum().getCoverUrl(),
                music.getPlaylists().stream().map(
                        Playlist::getId
                ).collect(Collectors.toList()),
                music.getDuration(),
                music.getReleaseDate(),
                music.getTimesListen(),
                music.getExplicit(),
                music.getCreatedAt(),
                music.getUpdatedAt()
        );
    }
}