package com.library_management_system.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueRequestDTO {

    @NotNull(message = "{book.id.required}")
    private Long bookId;
}