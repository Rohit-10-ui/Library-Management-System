package com.library_management_system.service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.library_management_system.dto.AdminDashboardDto;
import com.library_management_system.dto.PersonalDetails;
import com.library_management_system.entity.ApprovalStatus;
import com.library_management_system.entity.Role;
import com.library_management_system.entity.User;
import com.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private static final String CHARS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private static final SecureRandom random = new SecureRandom();
    private final UserRepository repo;
    private final PasswordEncoder encoder ;
    @Override
    public List<PersonalDetails> fetchRegistrations() {

    List<User> users = repo.findByStatus(ApprovalStatus.PENDING);

    return users.stream().map(user -> {
    PersonalDetails dto = new PersonalDetails();
    dto.setUsername(user.getUsername());
    dto.setEmail(user.getEmail());
    dto.setFirstName(user.getFirstName());
    dto.setLastName(user.getLastName());
    return dto;
}).toList();

}


    @Override
    public String approve(String username) {
        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(ApprovalStatus.APPROVED);
        user.setVerified_at(LocalDateTime.now());
        user.setVerified_by("ADMIN");
        String password =   this.generatePassword();
        String passwordEnc = encoder.encode(password);
        user.setPassword(passwordEnc);
        repo.save(user);
        return password;
    }

    @Override
    public void reject(String username) {
        User user = repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(ApprovalStatus.REJECTED);
        user.setVerified_at(LocalDateTime.now());

        repo.save(user);
    }
    @Override
    public String generatePassword(){
        int length = 6;
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
       
    }
  //rest controller advice - handle   
@Override
public AdminDashboardDto getDashboard() {

    long total = repo.count();

    long admins = repo.countByRole(Role.ADMIN);
    long librarians = repo.countByRole(Role.LIBRARIAN);
    long students = repo.countByRole(Role.USER);

    long approved = repo.countByStatus(ApprovalStatus.APPROVED);
    long pending = repo.countByStatus(ApprovalStatus.PENDING);
    long rejected = repo.countByStatus(ApprovalStatus.REJECTED);

    return new AdminDashboardDto(
            total,
            admins,
            librarians,
            students,
            approved,
            pending,
            rejected
    );
}
@Override
public byte[] getIdProof(String username) {

    User user = repo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    try {
        Path path = Paths.get(user.getIdProofPath());
        return Files.readAllBytes(path);
    } catch (IOException e) {
        throw new RuntimeException("File not found");
    }
}

}
