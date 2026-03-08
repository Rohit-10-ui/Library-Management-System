package com.library_management_system.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Issue issue;

    private Double amount;

    private String currency;

    private String sessionId;
    
    @Column(length = 1000)
    private String paymentUrl;

    private String status; // PENDING, PAID, FAILED

    private LocalDateTime createdAt;

}