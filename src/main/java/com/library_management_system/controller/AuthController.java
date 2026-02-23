package com.library_management_system.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.library_management_system.dto.AcademicInfoDTO;
import com.library_management_system.dto.AddressDTO;
import com.library_management_system.dto.LoginRequest;
import com.library_management_system.dto.PersonalDetails;
import com.library_management_system.dto.WorkExperienceDTO;
import com.library_management_system.service.LoginService;
import com.library_management_system.service.SignupService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
        
    private final LoginService loginService;
    private final SignupService service;
    private final ObjectMapper mapper;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> register(
            @RequestPart("role") String role,
            @RequestPart("personalDetails") String personalJson,
            @RequestPart("address") String addressJson,
            @RequestPart(value = "academicInfoList", required = false) String academicJson,
            @RequestPart(value = "workExperienceList", required = false) String workJson,
            @RequestPart(value = "employeeId", required = false) String employeeId,
            @RequestPart(value = "librarySection", required = false) String librarySection,
            @RequestPart(value = "idProof", required = false) MultipartFile idProof
    ) throws Exception {

        PersonalDetails personal = mapper.readValue(personalJson, PersonalDetails.class);
        AddressDTO address = mapper.readValue(addressJson, AddressDTO.class);

        List<AcademicInfoDTO> academics =
                academicJson == null ? null :
                mapper.readValue(academicJson, new TypeReference<>() {});

        List<WorkExperienceDTO> work =
                workJson == null ? null :
                mapper.readValue(workJson, new TypeReference<>() {});

        service.signup(role, personal, address, academics, work, employeeId, librarySection, idProof);

        return ResponseEntity.ok("Request sent to admin");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        String token = loginService.login(request.getUsername(), request.getPassword());
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@LOGIN CONTROLLERR@@@@@@@@@@");
        return ResponseEntity.ok(Map.of("token", token));
    }
}
