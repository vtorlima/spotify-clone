package com.catijr.backend.Controllers;

import com.catijr.backend.DTOs.Music.GetMusicDTO;
import com.catijr.backend.Services.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/album/")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping("{albumId}/musics")
    public ResponseEntity<List<GetMusicDTO>> getMusicsByAlbumId(@PathVariable String albumId) {
        var musics = albumService.getMusicsByAlbumId(UUID.fromString(albumId));

        List<GetMusicDTO> responseDTO = musics.stream().map(GetMusicDTO::new).toList();

        return ResponseEntity.ok(responseDTO);
    }

}
