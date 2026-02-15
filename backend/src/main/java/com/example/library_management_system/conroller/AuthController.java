
package com.example.library_management_system.conroller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.AcademicInfoDTO;
import com.example.library_management_system.dto.AddressDTO;
import com.example.library_management_system.dto.LoginRequest;
import com.example.library_management_system.dto.PersonalDetails;
import com.example.library_management_system.dto.WorkExperienceDTO;
import com.example.library_management_system.entity.ApprovalStatus;
import com.example.library_management_system.entity.User;
import com.example.library_management_system.repository.UserRepository;
import com.example.library_management_system.service.EmailService;
import com.example.library_management_system.service.LoginService;
import com.example.library_management_system.service.SignupService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")

@RequiredArgsConstructor
public class AuthController {
    
    private final LoginService loginService;
    private final SignupService service;
    private final ObjectMapper mapper;
    private final UserRepository userRepository;
    private final EmailService emailService;

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


    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    String token = loginService.login(
        request.getUsername(),
        request.getPassword()
    );

    return ResponseEntity.ok(Map.of("token", token));

}



@GetMapping("/pending-users")
public ResponseEntity<List<Map<String, Object>>> getPendingUsers() {
    List<User> users = userRepository.findByStatus(ApprovalStatus.PENDING);
    List<Map<String, Object>> response = users.stream().map(u -> {
        Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", u.getId());
        map.put("firstName", u.getFirstName());
        map.put("lastName", u.getLastName());
        map.put("email", u.getEmail());
        map.put("phone", u.getPhone());
        map.put("role", u.getRole());
        if (u.getAddress() != null) {
            map.put("address", Map.of("city", u.getAddress().getCity()));
        }
        return map;
    }).toList();
    return ResponseEntity.ok(response);
}

@PostMapping("/approve/{id}")
public ResponseEntity<?> approveUser(@PathVariable Long id) {

    User user = userRepository.findById(id).orElseThrow();

    user.setStatus(ApprovalStatus.APPROVED);

    String token = UUID.randomUUID().toString();
    user.setResetToken(token);
    user.setTokenExpiry(LocalDateTime.now().plusMinutes(30));

    userRepository.save(user);

    // Generate a clickable link for the frontend (assuming frontend runs on port 3000)
    String resetLink = "http://localhost:3000/reset-password?token=" + token;

    try {
        emailService.sendResetEmail(user.getEmail(), resetLink);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.ok("User approved, but email failed: " + e.getMessage());
    }

    return ResponseEntity.ok("User approved & email sent");
}

@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestBody Map<String, String> request) {
    loginService.resetPassword(token, request.get("password"));
    return ResponseEntity.ok("Password set successfully");
}

@PostMapping("/reject/{id}")
public ResponseEntity<?> rejectUser(@PathVariable Long id) {
    userRepository.deleteById(id);
    return ResponseEntity.ok("User registration rejected");
}
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        loginService.forgotPassword(email);
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

}
