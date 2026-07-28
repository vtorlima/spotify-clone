package com.catijr.backend.Controllers;

import com.catijr.backend.DTOs.Album.GetAlbumDTO;
import com.catijr.backend.DTOs.Album.GetAlbumNoMusicsDTO;
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
@RequestMapping("/album")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping
    public ResponseEntity<List<GetAlbumNoMusicsDTO>> getAllAlbums() {
        var albums = albumService.getAllAlbums();

        List<GetAlbumNoMusicsDTO> responseDTO = albums.stream().map(GetAlbumNoMusicsDTO::new).toList();

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<GetAlbumDTO> getAlbumById(@PathVariable String albumId) {
        var album = albumService.findById(UUID.fromString(albumId));

        return ResponseEntity.ok(new GetAlbumDTO(album));
    }

    @GetMapping("/{albumId}/musics")
    public ResponseEntity<List<GetMusicDTO>> getMusicsByAlbumId(@PathVariable String albumId) {
        var musics = albumService.getMusicsByAlbumId(UUID.fromString(albumId));

        List<GetMusicDTO> responseDTO = musics.stream().map(GetMusicDTO::new).toList();

        return ResponseEntity.ok(responseDTO);
    }

}
