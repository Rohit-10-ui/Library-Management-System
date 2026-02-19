package com.example.library_management_system.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.AcademicInfoDTO;
import com.example.library_management_system.dto.AddressDTO;
import com.example.library_management_system.dto.PersonalDetails;
import com.example.library_management_system.dto.WorkExperienceDTO;


public interface SignupService {
    public void signup(String role,PersonalDetails personal,
                       AddressDTO addressDto,
                       List<AcademicInfoDTO> academics,
                       List<WorkExperienceDTO> work,
                       String employeeId,
                       String librarySection,
                       MultipartFile file);
}
