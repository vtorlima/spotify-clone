package com.catijr.backend.Services;

import com.catijr.backend.Entities.Music;
import com.catijr.backend.Repositories.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final MusicRepository musicRepository;

    public List<Music> getAllMusics() {
        return musicRepository.findAll();
    }
}
