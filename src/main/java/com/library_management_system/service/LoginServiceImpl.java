package com.library_management_system.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.library_management_system.entity.ApprovalStatus;
import com.library_management_system.entity.User;
import com.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    @Override
    public String login(String username, String password) {
System.out.println("LOGIN SERVICE HIT");

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
}
