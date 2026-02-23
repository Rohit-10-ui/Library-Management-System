package com.library_management_system.controller;

import org.springframework.web.bind.annotation.PostMapping;

import com.library_management_system.dto.IssueRequestDTO;
import com.library_management_system.dto.IssueResponseDTO;
import com.library_management_system.dto.ReturnRequestDTO;
import com.library_management_system.entity.Issue;
import com.library_management_system.entity.IssueStatus;
import com.library_management_system.service.IssueService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService service;

    @PostMapping("/issues")
    public ResponseEntity<IssueResponseDTO> issue(
            @Valid @RequestBody IssueRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.issueBook(dto));
    }

    @PostMapping("/returns")
    public ResponseEntity<IssueResponseDTO> returnBook(
            @Valid @RequestBody ReturnRequestDTO dto) {
        return ResponseEntity.ok(service.returnBook(dto));
    }

    @GetMapping("/issues")
    public ResponseEntity<List<IssueResponseDTO>> current() {
        return ResponseEntity.ok(service.getCurrentIssued());
    }

    @GetMapping("/members/{userId}/history")
    public ResponseEntity<List<IssueResponseDTO>> history(
            @PathVariable Long userId) {
        return ResponseEntity.ok(service.getHistory(userId));
    }
}