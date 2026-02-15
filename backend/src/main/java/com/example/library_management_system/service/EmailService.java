package com.example.library_management_system.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApprovalEmail(String toEmail, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Account Approved - Library Management System");
            message.setText("Dear " + username + ",\n\n" +
                    "Your account has been successfully approved by the administrator.\n" +
                    "You can now log in to the system using your registered credentials.\n\n" +
                    "Best regards,\nLibrary Management Team");

            mailSender.send(message);
            System.out.println("Approval email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending approval email to " + toEmail + ": " + e.getMessage());
        }
    }

    public void sendWelcomeEmail(String toEmail, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Registration Successful - Library Management System");
            message.setText("Dear " + username + ",\n\n" +
                    "Thank you for registering with the Library Management System.\n" +
                    "Your account is currently PENDING approval. You will be notified once an administrator approves your account.\n\n" +
                    "Best regards,\nLibrary Management Team");

            mailSender.send(message);
            System.out.println("Welcome email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending welcome email to " + toEmail + ": " + e.getMessage());
        }
    }

    public void sendResetEmail(String toEmail, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Password Reset Request");
            message.setText("To reset your password, click the link below:\n" + resetLink);
            mailSender.send(message);
            System.out.println("Reset email sent successfully to " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending reset email to " + toEmail + ": " + e.getMessage());
        }
    }
}
