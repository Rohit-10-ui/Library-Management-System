package com.library_management_system.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library_management_system.dto.AdminDashboardDto;
import com.library_management_system.dto.PersonalDetails;
import com.library_management_system.entity.User;
import com.library_management_system.service.AdminService;
import com.library_management_system.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService service;
    
    private final EmailService emailService;
@GetMapping("/dashboard")
public ResponseEntity<AdminDashboardDto> dashboard() {
    return ResponseEntity.ok(service.getDashboard());
}

    @GetMapping("/registrations")
    public ResponseEntity<List<PersonalDetails>> registrations() {
        return ResponseEntity.ok(service.fetchRegistrations());
    }

    @PostMapping("/approve/{username}")
    public ResponseEntity<String> approve(@PathVariable String username) {
        String password = service.approve(username);
        
        String body = "Hey, Greetings from LibraryHub!!! \nUse the following credentials to log into your account:\n\n" + "Username : "+username + "\n"+ "Password : "  +password;
        emailService.sendEmail(
            username,
            "Verification Status Update | LibraryHub Support",
            body
        );
        return ResponseEntity.ok("Approved");
    }

    @PostMapping("/reject/{username}")
    public ResponseEntity<String> reject(@PathVariable String username) {
        service.reject(username);
        String body =
        "Hey,\n\n" +
        "Greetings from LibraryHub!\n\n" +
        "Your registration request has been rejected after verification.\n" +
        "Please review the following issues and update them before applying again:\n\n" +
        "• Name does not match official records\n" +
        "• Invalid or unclear identification proof\n" +
        "• Incomplete profile information\n" +
        "• Duplicate or already existing account\n" +
        "• Contact details could not be verified\n\n" +
        "Once corrected, you may submit a new registration request.\n\n" +
        "If you believe this was a mistake or need help, please contact support.\n\n" +
        "Regards,\n" +
        "LibraryHub Team";

        emailService.sendEmail(
            username,
            "Verification Status Update | LibraryHub Support",
            body);
        return ResponseEntity.ok("Rejected");
    }
    @GetMapping("/idproof/{username}")
    public ResponseEntity<byte[]> getIdProof(@PathVariable String username) {

    byte[] file = service.getIdProof(username);

    return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=idproof")
            .body(file);
}

}
