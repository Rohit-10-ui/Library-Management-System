package com.library_management_system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueRequestDTO {

    @NotNull(message = "{book.id.required}")
    private Long bookId;

    @NotBlank(message = "{username.required}")
    private String username;   // user for whom book is issued
}