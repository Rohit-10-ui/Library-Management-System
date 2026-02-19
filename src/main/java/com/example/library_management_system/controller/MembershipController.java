package com.example.library_management_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.library_management_system.entity.Membership;
import com.example.library_management_system.service.MembershipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/memberships")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService service;

    // CREATE
    @PostMapping
    public Membership create(@RequestBody Membership membership) {
        return service.create(membership);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Membership update(@PathVariable Long id,
                             @RequestBody Membership membership) {
        return service.update(id, membership);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Membership getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // GET ALL
    @GetMapping
    public List<Membership> getAll() {
        return service.getAll();
    }
}
