package com.example.library_management_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_management_system.entity.Membership;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Optional<Membership> findByName(String name);

}
