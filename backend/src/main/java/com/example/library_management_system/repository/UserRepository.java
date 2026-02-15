package com.example.library_management_system.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByStatus(ApprovalStatus status);
     Optional<User> findByEmail(String email);
    Optional<User> findByResetToken(String resetToken);
}
