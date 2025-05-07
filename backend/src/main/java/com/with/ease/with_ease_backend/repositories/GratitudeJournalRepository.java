package com.with.ease.with_ease_backend.repositories;

import com.with.ease.with_ease_backend.models.GratitudeJournal;
import com.with.ease.with_ease_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GratitudeJournalRepository extends JpaRepository<GratitudeJournal, Long> {
    List<GratitudeJournal> findByUserOrderByTimestampDesc(User user);

}
