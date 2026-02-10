package com.example.library_management_system.dto;

import lombok.Data;

@Data
public class WorkExperienceDTO {
    private String startDate;
    private String endDate;
    private boolean currentlyWorking;
    private String companyName;
    private String designation;
    private String ctc;
    private String reasonForLeaving;
}
