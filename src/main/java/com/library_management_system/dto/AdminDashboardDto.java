
package com.library_management_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardDto {

    private long totalUsers;

    private long totalAdmins;
    private long totalLibrarians;
    private long totalStudents;

    private long approved;
    private long pending;
    private long rejected;
}
