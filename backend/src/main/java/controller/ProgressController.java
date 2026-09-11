package com.tsuginani.backend.controller;

import com.tsuginani.backend.dto.ProgressResponse;
import com.tsuginani.backend.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    @Autowired
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ProgressResponse getProgress(Authentication authentication) {
        String email = authentication.getName();
        return progressService.getProgress(email);
    }

    @PostMapping("/next")
    public ProgressResponse advanceToNextStep(Authentication authentication) {
        String email = authentication.getName();
        return progressService.advanceToNextStep(email);
    }

    @PostMapping("/reset")
    public ProgressResponse resetProgress(Authentication authentication) {
        String email = authentication.getName();
        return progressService.resetProgress(email);
    }
}
