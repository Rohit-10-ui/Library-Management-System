package com.example.library_management_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startDate;
    private String endDate;
    private boolean currentlyWorking;
    private String companyName;
    private String designation;
    private String ctc;
    private String reasonForLeaving;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
