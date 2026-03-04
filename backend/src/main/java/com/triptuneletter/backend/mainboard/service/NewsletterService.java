package com.triptuneletter.backend.mainboard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.triptuneletter.backend.mainboard.entity.Newsletter;
import com.triptuneletter.backend.mainboard.repository.NewsletterRepository;

@Service
@RequiredArgsConstructor
public class NewsletterService {

    private final NewsletterRepository newsletterRepository;

    public Newsletter getDetail(Long id) {
        return newsletterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));
    }

    public Newsletter update(Long id, Newsletter updated) {
        Newsletter newsletter = getDetail(id);

        newsletter.setTitle(updated.getTitle());
        newsletter.setContent(updated.getContent());
        newsletter.setTravelKeyword(updated.getTravelKeyword());
        newsletter.setMusicTitle(updated.getMusicTitle());
        newsletter.setMusicArtist(updated.getMusicArtist());
        newsletter.setYoutubeUrl(updated.getYoutubeUrl());

        return newsletterRepository.save(newsletter);
    }

    public void delete(Long id) {
        newsletterRepository.deleteById(id);
    }

    public Newsletter publish(Long id) {
        Newsletter newsletter = getDetail(id);
        newsletter.setPublic(true);
        return newsletterRepository.save(newsletter);
    }
}