package com.library_management_system.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.library_management_system.entity.Membership;
import com.library_management_system.entity.User;
import com.library_management_system.repository.MembershipRepository;
import com.library_management_system.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembershipServiceImpl implements MembershipService {

    private final MembershipRepository repository;
    private final UserRepository userRepository;

    @Override
    public Membership create(Membership membership) {
        membership.setActive(true);
        return repository.save(membership);
    }

    @Override
    public Membership update(Long id, Membership membership) {
        Membership existing = getById(id);

        existing.setName(membership.getName());
        existing.setBorrowLimit(membership.getBorrowLimit());
        existing.setDurationDays(membership.getDurationDays());
        existing.setFee(membership.getFee());
        existing.setLateFeePerDay(membership.getLateFeePerDay());
        existing.setActive(membership.getActive());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Membership getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership not found"));
    }

    @Override
    public List<Membership> getAll() {
        return repository.findAll();
    }

  
@Override
public Page<User> getMembersByMembership(Long Id, int page, int size) {

    if (!repository.existsById(Id)) {
        throw new RuntimeException("Membership not found");
    }

    Pageable pageable = PageRequest.of(page, size);
    return userRepository.findByMembership_Id(Id, pageable);
}
}