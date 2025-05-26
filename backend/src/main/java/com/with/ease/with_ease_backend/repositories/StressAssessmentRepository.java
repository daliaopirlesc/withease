package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.StressAssessmentEntry;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StressAssessmentRepository extends JpaRepository<StressAssessmentEntry, Long> {
    List<StressAssessmentEntry> findByUserOrderByDateDesc(User user);
    boolean existsByUserAndDateAfter(User user, LocalDate date);
}
