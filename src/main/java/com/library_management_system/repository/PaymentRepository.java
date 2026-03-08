package com.library_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library_management_system.entity.Payment;

import java.util.Optional;
public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByIssueId(Long issueId);

}