package com.library_management_system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignMembershipDTO {

    @NotBlank
    private String username;

    @NotNull
    private Long membershipId;
}