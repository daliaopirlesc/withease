package com.with.ease.with_ease_backend.controllers;

import com.with.ease.with_ease_backend.models.Reminder;
import com.with.ease.with_ease_backend.models.User;
import com.with.ease.with_ease_backend.services.ReminderService;
import com.with.ease.with_ease_backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
public class ReminderController {
    private final ReminderService reminderService;
    private final UserService userService;


    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Reminder> createReminder(@Valid @RequestBody Reminder reminder, Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        reminder.setUser(user);
        Reminder savedReminder = reminderService.createReminder(reminder);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReminder);
    }


    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Reminder>> getUserReminders(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        List<Reminder> reminders = reminderService.getUserReminders(user);
        return ResponseEntity.ok(reminders);
    }


    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Reminder> getReminderById(@PathVariable Long id, Authentication authentication) {
        Reminder reminder = reminderService.getReminderById(id);


        if (!reminder.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(reminder);
    }


    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Reminder> updateReminder(@PathVariable Long id, @RequestBody Reminder newDetails, Authentication authentication) {
        Reminder reminder = reminderService.getReminderById(id);


        if (!reminder.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Reminder updated = reminderService.updateReminder(id, newDetails).orElse(null);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> deleteReminder(@PathVariable Long id, Authentication authentication) {
        Reminder reminder = reminderService.getReminderById(id);

        // Security check: Ensure user owns this reminder
        if (!reminder.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        reminderService.deleteReminder(id);
        return ResponseEntity.ok("Reminder deleted successfully.");
    }
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Reminder> completeReminder(@PathVariable Long id) {
        Reminder updatedReminder = reminderService.completeReminder(id);
        return ResponseEntity.ok(updatedReminder);
    }

}
