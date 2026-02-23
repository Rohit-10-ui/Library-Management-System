package com.library_management_system.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library_management_system.entity.Membership;
import com.library_management_system.entity.User;
import com.library_management_system.service.MembershipService;

import org.springframework.data.domain.Page;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/memberships")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService service;

    // CREATE
    @PostMapping
    public ResponseEntity<Membership> create(@RequestBody Membership membership) {
        Membership created = service.create(membership);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Membership> update(@PathVariable Long id,
                                             @RequestBody Membership membership) {
        Membership updated = service.update(id, membership);
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Membership> getById(@PathVariable Long id) {
        Membership membership = service.getById(id);
        return ResponseEntity.ok(membership);
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Membership>> getAll() {
        List<Membership> memberships = service.getAll();
        return ResponseEntity.ok(memberships);
    }
@GetMapping("/{id}/members")
public ResponseEntity<Page<User>> getMembersByMembership(
        @PathVariable Long id,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

    Page<User> users = service.getMembersByMembership(id, page, size);
    return ResponseEntity.ok(users);
}
}

