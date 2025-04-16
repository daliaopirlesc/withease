package com.with.ease.with_ease_backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendResetEmail(String to, String token) {
        String subject = "Your Password Reset Code";
        String content = "<p>Use the code below to reset your password:</p>"
                + "<h2>" + token + "</h2>"
                + "<p>This code will expire in 1 hour.</p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("daliaopirlesc@yahoo.com");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }

}
