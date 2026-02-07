package com.example.library_management_system.service;

import org.springframework.web.multipart.MultipartFile;


public interface SignupService<T> {
    void signup(T req, MultipartFile idProof);
}
