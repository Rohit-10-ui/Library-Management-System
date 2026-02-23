package com.library_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library_management_system.entity.AcademicInfo;

public interface AcademicInfoRepository extends JpaRepository<AcademicInfo, Long> {}
