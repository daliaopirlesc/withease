package com.with.ease.with_ease_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeditationProgressRequest {
    private String meditationTitle;
    private int duration;
}
