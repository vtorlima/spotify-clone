package com.catijr.backend.Mappers;

import org.mapstruct.Mapper;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Entities.Music;

@Mapper(componentModel="spring")
public interface MusicMapper {
    
    GetMusicDTO toDTO(Music music);
}
