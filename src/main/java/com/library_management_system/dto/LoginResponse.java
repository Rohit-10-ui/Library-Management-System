package com.library_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String username;
    private String token;
    private String role;
    private Long id;
}