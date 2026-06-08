package com.catijr.backend.DTOs.Music;

import com.catijr.backend.Entities.Music;

import java.util.List;

public record GetPopSongsResponseDTO(List<GetMusicDTO> popularMusics) {
}