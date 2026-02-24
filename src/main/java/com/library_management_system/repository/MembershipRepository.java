package com.library_management_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library_management_system.entity.Membership;
import com.library_management_system.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;


public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Optional<Membership> findByName(String name);

Page<User> findById(Long Id, Pageable pageable);

}
