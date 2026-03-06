package com.library_management_system.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.library_management_system.dto.AssignMembershipDTO;
import com.library_management_system.entity.Membership;
import com.library_management_system.entity.User;
import com.library_management_system.repository.MembershipRepository;
import com.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MembershipServiceImpl implements MembershipService {

    private final MembershipRepository repository;
    private final UserRepository userRepository;
    private final EmailService emailservice;
@Override
public void assignMembership(AssignMembershipDTO dto) {

    User user = userRepository.findByUsername(dto.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Membership membership = repository.findById(dto.getMembershipId())
            .orElseThrow(() -> new RuntimeException("Membership not found"));

    if (!membership.getActive())
        throw new RuntimeException("Membership plan is inactive");

    user.setMembership(membership);
    userRepository.save(user);

     
emailservice.sendEmail(
            dto.getUsername(),
            "Membership Assigned | LibraryHub Support",
            "Greetings, "+user.getUsername() +"\nYou have  been subscribed for "+membership.getName() +" membership plan."+ "\n Fee: "+ membership.getFee()+ "\nMax books borrowed at a time: "+membership.getBorrowLimit()+ "\n return issued books within: "+membership.getDurationDays()+ "\n\n Not returning books on time will result in fine \n If book is damaged or lost full MRP is to be paid as a fine   \n Failing to  pay membership fee will reult in revocation of membership");
        
}
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