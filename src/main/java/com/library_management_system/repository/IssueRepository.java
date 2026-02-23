package com.library_management_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.library_management_system.entity.Issue;
import com.library_management_system.entity.IssueStatus;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByUserId(Long userId);

    List<Issue> findByStatus(IssueStatus status);

    long countByUserIdAndStatus(Long userId, IssueStatus status);
    
}