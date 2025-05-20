package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.MeditationProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeditationProgressRepository extends JpaRepository<MeditationProgress, Long> {
}
