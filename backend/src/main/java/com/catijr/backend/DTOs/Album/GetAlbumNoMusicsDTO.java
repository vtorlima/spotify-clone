package com.catijr.backend.DTOs.Album;

import com.catijr.backend.Entities.Album;

import java.time.Instant;
import java.util.UUID;

public record GetAlbumNoMusicsDTO(UUID id, String title,
                          String year, String coverUrl,
                          UUID artistId, String artistName,
                          Instant createdAt, Instant updatedAt) {

    public GetAlbumNoMusicsDTO(Album album) {
        this(
                album.getId(),
                album.getTitle(),
                album.getYear(),
                album.getCoverUrl(),
                album.getOwner().getId(),
                album.getOwner().getName(),
                album.getCreatedAt(),
                album.getUpdatedAt()
        );
    }
}