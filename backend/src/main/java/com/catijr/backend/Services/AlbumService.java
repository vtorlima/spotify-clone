package com.catijr.backend.Services;

import com.catijr.backend.Entities.Music;
import com.catijr.backend.Repositories.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;

    public List<Music> getMusicsByAlbumId(UUID albumId) {
        var album = albumRepository.findById(albumId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return album.getMusics();
    }

}
