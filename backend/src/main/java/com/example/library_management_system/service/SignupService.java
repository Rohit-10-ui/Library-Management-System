package com.example.library_management_system.service;

import java.util.Map;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.PersonalDetails;
import com.example.library_management_system.dto.AddressDTO;
import com.example.library_management_system.dto.AcademicInfoDTO;
import com.example.library_management_system.dto.WorkExperienceDTO;
public interface SignupService {
    void signup(
            String role,
            PersonalDetails personal,
            AddressDTO address,
            List<AcademicInfoDTO> academics,
            List<WorkExperienceDTO> work,
            String employeeId,
            String librarySection,
            MultipartFile file
    );
}
