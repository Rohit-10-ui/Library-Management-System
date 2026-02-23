package com.library_management_system.dto;

@Data
public class ReturnRequestDTO {

    @NotNull(message = "{issue.id.required}")
    private Long issueId;

    @NotNull(message = "{issue.status.required}")
    private IssueStatus status;
}