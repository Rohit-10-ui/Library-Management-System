package com.library_management_system.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.library_management_system.dto.AssignMembershipDTO;
import com.library_management_system.entity.Membership;
import com.library_management_system.entity.User;

public interface MembershipService {

    Membership create(Membership membership);

    Membership update(Long id, Membership membership);

    void delete(Long id);

    Membership getById(Long id);

    List<Membership> getAll();
    
    public Page<User> getMembersByMembership(Long membershipId, int page, int size) ;

    void assignMembership(AssignMembershipDTO dto);
}
