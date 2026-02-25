package com.library_management_system.dto;

import java.time.LocalDate;

import com.library_management_system.entity.IssueStatus;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class IssueResponseDTO {

    private Long issueId;
    private String username;
    private String bookTitle;

    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;

    private double penalty;
    private IssueStatus status;
}