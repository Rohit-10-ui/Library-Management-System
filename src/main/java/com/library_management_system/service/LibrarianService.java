package com.library_management_system.service;

import java.util.List;

import com.library_management_system.dto.AdminDashboardDto;
import com.library_management_system.dto.PersonalDetails;

public interface LibrarianService {
List<PersonalDetails> fetchRegistrations();

    String approve(String username,String librarianName);

    void reject(String username,String librarianName);
    AdminDashboardDto getDashboard();
    String generatePassword();
    byte[] getIdProof(String username);

}
