package com.example.library_management_system.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.StudentSignupRequest;
import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.Role;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service("STUDENT")
@RequiredArgsConstructor
public class StudentSignupService implements SignupService<StudentSignupRequest> {

    private final UserRepository repo;

    @Override
    public void signup(StudentSignupRequest req, MultipartFile file) {

        User user = new User();
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setAddress(req.getAddress());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setGender(req.getGender());

        user.setRole(Role.STUDENT);
        user.setStatus(ApprovalStatus.PENDING);

        // store file path (simplified)
        user.setIdProofPath(file.getOriginalFilename());

        repo.save(user);
    }

}
