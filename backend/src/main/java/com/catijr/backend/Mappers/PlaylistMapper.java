package com.catijr.backend.Mappers;

import com.catijr.backend.DTOs.Playlist.GetPlaylistNoMusicDTO;
import com.catijr.backend.DTOs.Playlist.CreatePlaylistDTO;
import com.catijr.backend.DTOs.Playlist.GetPlaylistDTO;
import com.catijr.backend.Entities.Playlist;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlaylistMapper {

    GetPlaylistNoMusicDTO toDTO(Playlist playlist);

    Playlist toEntity(CreatePlaylistDTO playlist);
}