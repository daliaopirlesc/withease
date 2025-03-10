package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.Meditation;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MeditationRepository extends JpaRepository<Meditation, Long> {
    List<Meditation> findByUser(User user);
    List<Meditation> findByUserAndCompleted(User user, boolean completed);
    List<Meditation> findByUserAndCompletionDate(User user, LocalDate completionDate);

}
