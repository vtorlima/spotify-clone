package com.catijr.backend.Mappers;

import org.mapstruct.Mapper;

import com.catijr.backend.DTOs.Artist.GetArtistDTO;
import com.catijr.backend.Entities.Artist;

@Mapper(componentModel="spring")
public interface ArtistMapper {
    GetArtistDTO  toDTO(Artist artist);
}
