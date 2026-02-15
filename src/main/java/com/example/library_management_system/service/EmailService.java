package com.example.library_management_system.service;
import org.springframework.stereotype.Service;

import com.example.library_management_system.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.example.library_management_system.entity.User;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository repo;

    public EmailService(JavaMailSender mailSender,UserRepository repo) {
        this.mailSender = mailSender;
        this.repo = repo;
    }

    public void sendEmail(String to, String subject, String body) {
    repo.findByUsername(to).ifPresent(user -> {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(user.getEmail());
    message.setSubject(subject);
    message.setText(body);
    mailSender.send(message);
});


        
    }
}
