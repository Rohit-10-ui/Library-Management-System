package com.library_management_system.service;

import com.library_management_system.dto.LoginResponse;

public interface LoginService {
    LoginResponse login(String username, String password);
}
