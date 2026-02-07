package com.example.library_management_system.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.LibrarianSignupRequest;
import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.Role;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service("LIBRARIAN")
@RequiredArgsConstructor
public class LibrarianSignupService implements SignupService<LibrarianSignupRequest> {

    private final UserRepository repo;

    @Override
    public void signup(LibrarianSignupRequest req, MultipartFile file) {

        User user = new User();
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setAddress(req.getAddress());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setGender(req.getGender());
        user.setQualification(req.getQualification());
        user.setEmployeeId(req.getEmployeeId());
        user.setLibrarySection(req.getLibrarySection());
        user.setRole(Role.LIBRARIAN);
        user.setStatus(ApprovalStatus.PENDING);
        user.setIdProofPath(file.getOriginalFilename());
        repo.save(user);
    }
}
