package com.example.library_management_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LibrarianSignupRequest {
    @NotBlank 
    private String firstName;
    private String lastName;
    @Email 
    private String email;
    private String phone;
    private String address;
    private String dateOfBirth;
    private String gender;

    private String qualification;
    private String employeeId;
    private String librarySection;
}
