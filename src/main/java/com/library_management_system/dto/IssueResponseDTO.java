package com.library_management_system.dto;

import java.time.LocalDate;

import com.library_management_system.entity.IssueStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IssueResponseDTO {

    private Long issueId;
    private String bookTitle;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private Double penalty;
    private IssueStatus status;
}
