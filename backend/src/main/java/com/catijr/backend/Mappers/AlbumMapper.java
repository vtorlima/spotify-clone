package com.catijr.backend.Mappers;

import org.mapstruct.Mapper;

import com.catijr.backend.DTOs.Album.GetAlbumDTO;
import com.catijr.backend.DTOs.Album.GetAlbumNoMusicsDTO;
import com.catijr.backend.Entities.Album;

@Mapper(componentModel="spring")
public interface AlbumMapper {
    
    GetAlbumDTO toDTO(Album album);

    GetAlbumNoMusicsDTO toNoMusicsDTO(Album album);
}
