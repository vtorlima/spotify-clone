package com.catijr.backend.Controllers;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Services.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @GetMapping
    public ResponseEntity<List<GetMusicDTO>> getAllMusics() {
        var musics = musicService.getAllMusics();

        List<GetMusicDTO> responseDTO = musics.stream().map(GetMusicDTO::new).toList();

        return ResponseEntity.ok(responseDTO);
    }
}
