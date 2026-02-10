package com.example.library_management_system.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_management_system.entity.User;
import com.example.library_management_system.entity.WorkExperience;


public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {}