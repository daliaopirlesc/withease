package com.with.ease.with_ease_backend.services;

import com.with.ease.with_ease_backend.dto.UserResponse;
import com.with.ease.with_ease_backend.models.*;
import com.with.ease.with_ease_backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final MoodLogRepository moodLogRepository;
    private final StressJournalRepository stressJournalRepository;
    private final StressAssessmentRepository stressAssessmentRepository;

    private final MeditationProgressRepository meditationProgressRepository;
    private final GratitudeJournalRepository gratitudeJournalRepository;

    private final ReminderRepository reminderRepository;


    @Autowired
    private EmailService emailService;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getAge(),
                user.getGender(),
                user.getOccupation(),
                user.getHealthInfo(),
                user.getGoals().stream().toList(),
                Boolean.TRUE.equals(user.getProfileCompleted()),
                user.getStreak(),
                user.getStressScore()
        );
    }

    public UserResponse changeUserRole(Long id, String newRole) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!newRole.equalsIgnoreCase("USER") && !newRole.equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Invalid role: " + newRole);
        }
        user.setRole(Role.valueOf(newRole.toUpperCase()));
        userRepository.save(user);
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getAge(),
                user.getGender(),
                user.getOccupation(),
                user.getHealthInfo(),
                user.getGoals().stream().toList(),
                Boolean.TRUE.equals(user.getProfileCompleted()),
                user.getStreak(),
                user.getStressScore()
        );
    }

    @Transactional
    public User createUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getName(),
                        user.getAge(),
                        user.getGender(),
                        user.getOccupation(),
                        user.getHealthInfo(),
                        user.getGoals().stream().toList(),
                        Boolean.TRUE.equals(user.getProfileCompleted()),
                        user.getStreak(),
                        user.getStressScore()
                ))
                .collect(Collectors.toList());
    }

    public Optional<UserResponse> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getName(),
                        user.getAge(),
                        user.getGender(),
                        user.getOccupation(),
                        user.getHealthInfo(),
                        user.getGoals().stream().toList(),
                        Boolean.TRUE.equals(user.getProfileCompleted()),
                        user.getStreak(),
                        user.getStressScore()
                ));
    }

    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public String generateResetToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        passwordResetTokenRepository.deleteByUser(user);
        String token = String.format("%06d", new Random().nextInt(999999));
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);
        emailService.sendResetEmail(email, token);
        return token;
    }

    @Transactional
    public String resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
        return "Password reset successfully!";
    }

    @Transactional
    public void updateUserGoals(String email, List<String> goals) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setGoals(goals);
        user.setProfileCompleted(true);
        userRepository.save(user);
    }

    public double calculateStressLevelFromAssessment(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        int score = user.getStressScore();
        return Math.min(1.0, score / 20.0);
    }

    public void updateStreak(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        LocalDate today = LocalDate.now();
        LocalDate lastDate = user.getLastActivityDate();
        if (lastDate == null || ChronoUnit.DAYS.between(lastDate, today) > 1) {
            user.setStreak(1);
        } else if (ChronoUnit.DAYS.between(lastDate, today) == 1) {
            user.setStreak(user.getStreak() + 1);
        }
        user.setLastActivityDate(today);
        userRepository.save(user);
    }
    public Map<String, Object> buildUserProgress(User user) {
        Map<String, Object> result = new HashMap<>();

        int stressAssessments = stressAssessmentRepository.findByUserOrderByDateDesc(user).size();
        Integer lastScore = user.getStressScore() != null ? user.getStressScore() : 0;

        int moodLogs = moodLogRepository.countByUser(user);
        String commonMood = moodLogRepository.findTopMoodByUser(user, PageRequest.of(0, 1)).stream().findFirst().orElse("N/A");

        int meditationSessions = meditationProgressRepository.countByUser(user);
        Integer totalMinutes = meditationProgressRepository.sumDurationByUser(user).orElse(0);

        int gratitudeJournals = gratitudeJournalRepository.countByUser(user);
        int stressJournals = stressJournalRepository.countByUser(user);

        int activeReminders = reminderRepository.countByUserAndActive(user, false);
        int completedReminders = reminderRepository.countByUserAndActive(user, true);

        result.put("stressAssessments", stressAssessments);
        result.put("lastStressScore", lastScore);
        result.put("moodLogs", moodLogs);
        result.put("commonMood", commonMood);
        result.put("meditationSessions", meditationSessions);
        result.put("totalMeditationMinutes", totalMinutes);
        result.put("gratitudeJournals", gratitudeJournals);
        result.put("stressJournals", stressJournals);
        result.put("activeReminders", activeReminders);
        result.put("completedReminders", completedReminders);

        return result;
    }

}
