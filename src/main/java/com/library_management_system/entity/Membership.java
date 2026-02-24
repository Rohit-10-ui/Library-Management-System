package com.library_management_system.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private Integer borrowLimit;
    private Integer durationDays;
    private Double fee;
    private Double lateFeePerDay;
    private Boolean active;

    @OneToMany(mappedBy = "membership")
    private List<User> users;
}