package com.example.library_management_system.service;

import java.util.List;

import com.example.library_management_system.entity.Membership;

public interface MembershipService {

    Membership create(Membership membership);

    Membership update(Long id, Membership membership);

    void delete(Long id);

    Membership getById(Long id);

    List<Membership> getAll();
}
