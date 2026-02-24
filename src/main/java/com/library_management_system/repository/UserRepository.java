package com.library_management_system.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library_management_system.entity.ApprovalStatus;
import com.library_management_system.entity.Membership;
import com.library_management_system.entity.Role;
import com.library_management_system.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {
Optional<User> findByUsername(String username);
Optional<User> findByUsernameAndRole(String username,Role role);
List<User> findByStatusAndRole(ApprovalStatus status, Role role);

long countByRole(Role role);

long countByStatus(ApprovalStatus status);

    public List<User> findByStatus(ApprovalStatus approvalStatus);

    
    Page<User> findByMembership_Id(Long id, Pageable pageable);

}

