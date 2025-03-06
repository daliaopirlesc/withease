package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.Challenge;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByUserAndRequiredStreaksLessThanEqualOrderByRequiredStreaks(User user, int streaks);
}
