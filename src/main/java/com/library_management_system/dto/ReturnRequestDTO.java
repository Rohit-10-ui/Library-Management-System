package com.library_management_system.dto;

import com.library_management_system.entity.IssueStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReturnRequestDTO {

    @NotNull(message = "{issue.id.required}")
    private Long issueId;

    @NotNull(message = "{issue.status.required}")
    private IssueStatus status;
}