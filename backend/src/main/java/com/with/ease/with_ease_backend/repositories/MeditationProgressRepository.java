package com.with.ease.with_ease_backend.repositories;
import com.with.ease.with_ease_backend.models.MeditationProgress;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface MeditationProgressRepository extends JpaRepository<MeditationProgress, Long> {
    int countByUser(User user);

    @Query("SELECT SUM(m.duration) FROM MeditationProgress m WHERE m.user = :user")
    Optional<Integer> sumDurationByUser(@Param("user") User user);
}
