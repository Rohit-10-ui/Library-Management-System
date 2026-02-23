package com.library_management_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "membership")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // STUDENT_BASIC, FACULTY etc

    private Integer borrowLimit;

    private Integer durationDays;

    private Double fee;

    private Double lateFeePerDay;

    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
