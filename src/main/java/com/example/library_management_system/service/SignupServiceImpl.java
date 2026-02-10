package com.example.library_management_system.service;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.AcademicInfoDTO;
import com.example.library_management_system.dto.AddressDTO;
import com.example.library_management_system.dto.PersonalDetails;
import com.example.library_management_system.dto.WorkExperienceDTO;
import com.example.library_management_system.entity.AcademicInfo;
import com.example.library_management_system.entity.Address;
import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.Role;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.entity.WorkExperience;
import com.example.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {

    private final UserRepository userRepo;

    @Override
    public void signup(String role,
                       PersonalDetails personal,
                       AddressDTO addressDto,
                       List<AcademicInfoDTO> academics,
                       List<WorkExperienceDTO> work,
                       String employeeId,
                       String librarySection,
                       MultipartFile file) {

        User user = new User();
        user.setUsername(personal.getUsername());
        user.setFirstName(personal.getFirstName());
        user.setLastName(personal.getLastName());
        user.setEmail(personal.getEmail());
        user.setPhone(personal.getPhone());
        user.setContactNo(personal.getContactNo());
        user.setGender(personal.getGender());
        user.setMaritalStatus(personal.getMaritalStatus());

        user.setRole(Role.valueOf(role.toUpperCase()));
        user.setStatus(ApprovalStatus.PENDING);

        user.setEmployeeId(employeeId);
        user.setLibrarySection(librarySection);

        
        String uploadDir = "uploads/idproofs/";

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir + fileName);
        
            try {
                Files.write(path, file.getBytes());
            } catch (IOException e) {

            }
        
        user.setIdProofPath(path.toString());

            user.setIdProofPath(file.getOriginalFilename());

        // Address
        Address address = new Address();
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setPincode(addressDto.getPincode());
        address.setUser(user);
        user.setAddress(address);

        // Academics
        if (academics != null) {
            user.setAcademicInfoList(
                academics.stream().map(a -> {
                    AcademicInfo ai = new AcademicInfo();
                    ai.setInstitutionName(a.getInstitutionName());
                    ai.setDegree(a.getDegree());
                    ai.setPassingYear(a.getPassingYear());
                    ai.setGrade(a.getGrade());
                    ai.setGradeInPercentage(a.getGradeInPercentage());
                    ai.setUser(user);
                    return ai;
                }).toList()
            );
        }

        // Work
        if (work != null) {
            user.setWorkExperienceList(
                work.stream().map(w -> {
                    WorkExperience we = new WorkExperience();
                    we.setStartDate(w.getStartDate());
                    we.setEndDate(w.getEndDate());
                    we.setCurrentlyWorking(w.isCurrentlyWorking());
                    we.setCompanyName(w.getCompanyName());
                    we.setDesignation(w.getDesignation());
                    we.setCtc(w.getCtc());
                    we.setReasonForLeaving(w.getReasonForLeaving());
                    we.setUser(user);
                    return we;
                }).toList()
            );
        }

        userRepo.save(user);
    }
}
