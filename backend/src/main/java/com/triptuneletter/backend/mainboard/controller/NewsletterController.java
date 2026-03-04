package com.triptuneletter.backend.mainboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.triptuneletter.backend.mainboard.entity.Newsletter;
import com.triptuneletter.backend.mainboard.service.NewsletterService;

@RestController
@RequestMapping("/api/newsletters")
@RequiredArgsConstructor
public class NewsletterController {

    private final NewsletterService newsletterService;

    // 상세보기
    @GetMapping("/{id}")
    public Newsletter detail(@PathVariable Long id) {
        return newsletterService.getDetail(id);
    }

    // 수정 (관리자만)
    @PutMapping("/{id}")
    public Newsletter update(@PathVariable Long id, @RequestBody Newsletter newsletter) {
        return newsletterService.update(id, newsletter);
    }

    // 삭제 (관리자만)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        newsletterService.delete(id);
        return "삭제 완료";
    }

    // 공개 처리 (관리자만)
    @PatchMapping("/{id}/publish")
    public Newsletter publish(@PathVariable Long id) {
        return newsletterService.publish(id);
    }
}