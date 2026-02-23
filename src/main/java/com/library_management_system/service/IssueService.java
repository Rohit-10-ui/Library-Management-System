package com.library_management_system.service;

import java.util.List;

import com.library_management_system.dto.IssueRequestDTO;
import com.library_management_system.dto.IssueResponseDTO;
import com.library_management_system.dto.ReturnRequestDTO;
import com.library_management_system.entity.Issue;
import com.library_management_system.entity.IssueStatus;

public interface IssueService {

    IssueResponseDTO issueBook(IssueRequestDTO dto);

    IssueResponseDTO returnBook(ReturnRequestDTO dto);

    List<IssueResponseDTO> getCurrentIssued();

    List<IssueResponseDTO> getHistory(Long userId);
}