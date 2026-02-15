package com.example.library_management_system.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    @Override
    public String login(String username, String password) {

        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials- no user with this name"));

        if (!encoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid credentials - password not matched");

        if (user.getStatus() != ApprovalStatus.APPROVED)
            throw new RuntimeException("Account not approved");

        return jwtService.generateToken(
                user.getUsername(),
                user.getRole().name()
        );
    }

    @Override
    public void forgotPassword(String email) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(30));
        repo.save(user);

        String resetLink = "http://localhost:3000/reset-password/" + token;
        emailService.sendResetEmail(email, resetLink);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        User user = repo.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        user.setPassword(encoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiry(null);
        repo.save(user);
    }
}
