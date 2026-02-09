package com.example.library_management_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class LibrarianSignupRequest {

    @NotBlank
    private String firstName;

    private String lastName;

    @Email
    @NotBlank
    private String email;

    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;

    private String address;
    private String dateOfBirth;
    private String gender;

    @NotBlank(message = "Qualification required")
    private String qualification;

    @NotBlank(message = "Employee id required")
    private String employeeId;

    private String librarySection;
}