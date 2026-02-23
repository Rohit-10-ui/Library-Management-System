
package com.library_management_system.service;

import java.util.List;

import com.library_management_system.dto.AdminDashboardDto;
import com.library_management_system.dto.PersonalDetails;
public interface AdminService {

    List<PersonalDetails> fetchRegistrations();

    String approve(String username);

    void reject(String username);
    AdminDashboardDto getDashboard();
    String generatePassword();
    byte[] getIdProof(String username);

}
