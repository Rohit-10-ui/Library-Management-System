package com.example.library_management_system.conroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.library_management_system.dto.LibrarianSignupRequest;
import com.example.library_management_system.dto.StudentSignupRequest;
import com.example.library_management_system.service.SignupServiceFactory;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import tools.jackson.databind.ObjectMapper;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final SignupServiceFactory factory;
    private final Validator validator;

    @PostMapping("/signup/{role}")
    public ResponseEntity<String> signup(
            @PathVariable String role,
            @RequestPart("data") String json,
            @RequestPart("file") MultipartFile file
    ) throws Exception {

        if(role.equalsIgnoreCase("STUDENT")) {

            StudentSignupRequest req =
                new ObjectMapper().readValue(json, StudentSignupRequest.class);

            var errors = validator.validate(req);
            if(!errors.isEmpty()) throw new ConstraintViolationException(errors);

            factory.getService("STUDENT").signup(req, file);
        }

        else if(role.equalsIgnoreCase("LIBRARIAN")) {

            LibrarianSignupRequest req =
                new ObjectMapper().readValue(json, LibrarianSignupRequest.class);

            var errors = validator.validate(req);
            if(!errors.isEmpty()) throw new ConstraintViolationException(errors);
            
            factory.getService("LIBRARIAN").signup(req, file);
        }

        return ResponseEntity.ok("Request sent to admin");
    }
}