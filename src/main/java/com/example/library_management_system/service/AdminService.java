
package com.example.library_management_system.service;

import java.util.List;

import com.example.library_management_system.dto.AdminDashboardDto;
import com.example.library_management_system.dto.PersonalDetails;
import com.example.library_management_system.entity.User;
public interface AdminService {

    List<PersonalDetails> fetchRegistrations();

    String approve(String username);

    void reject(String username);
    AdminDashboardDto getDashboard();
    String generatePassword();
}
