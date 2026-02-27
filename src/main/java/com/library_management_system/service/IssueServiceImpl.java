package com.library_management_system.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.library_management_system.dto.IssueRequestDTO;
import com.library_management_system.dto.IssueResponseDTO;
import com.library_management_system.dto.ReturnRequestDTO;
import com.library_management_system.entity.Book;
import com.library_management_system.entity.Issue;
import com.library_management_system.entity.IssueStatus;
import com.library_management_system.entity.User;
import com.library_management_system.exception.BusinessException;
import com.library_management_system.exception.ResourceNotFoundException;
import com.library_management_system.repository.BookRepository;
import com.library_management_system.repository.IssueRepository;
import com.library_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepo;
    private final BookRepository bookRepo;
    private final UserRepository userRepo;

    @Override
    public IssueResponseDTO issueBook(IssueRequestDTO dto) {

        User user = getUserByUsername(dto.getUsername());
        Book book = getBook(dto.getBookId());

        validateBorrowLimit(user);
        validateAvailability(book);

        Issue issue = buildIssue(user, book);
        updateAvailability(book, -1);

        log.info("Book issued to {} : {}", user.getUsername(), book.getTitle());
        return mapToDTO(issueRepo.save(issue));
    }

    @Override
    public IssueResponseDTO returnBook(ReturnRequestDTO dto) {

        Issue issue = getIssue(dto.getIssueId());
        Book book = issue.getBook();

        double penalty = calculatePenalty(issue, dto.getStatus());

        updateReturnDetails(issue, dto.getStatus(), penalty);
        updateAvailability(book, 1);

        log.info("Book returned: {}", book.getTitle());
        return mapToDTO(issueRepo.save(issue));
    }

    @Override
public List<IssueResponseDTO> getCurrentIssued() {

    return issueRepo.findByStatus(IssueStatus.ISSUED)
            .stream()
            .map(issue -> {
                issue.setPenalty(computeLivePenalty(issue));
                return mapToDTO(issue);
            })
            .toList();
}
   @Override
public List<IssueResponseDTO> getHistory(Long userId) {

    return issueRepo.findByUserId(userId)
            .stream()
            .map(issue -> {
                issue.setPenalty(computeLivePenalty(issue));
                return mapToDTO(issue);
            })
            .toList();
}

    // ================= PRIVATE METHODS =================
private double computeLivePenalty(Issue issue) {

    if (issue.getStatus() != IssueStatus.ISSUED)
        return issue.getPenalty();

    if (LocalDate.now().isAfter(issue.getDueDate())) {

        long overdueDays =
                ChronoUnit.DAYS.between(
                        issue.getDueDate(),
                        LocalDate.now());

        return overdueDays *
                issue.getUser()
                        .getMembership()
                        .getLateFeePerDay();
    }

    return 0;
}
    private User getUserByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException("user.not.found"));
    }

    private Book getBook(Long id) {
        return bookRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("book.not.found"));
    }

    private Issue getIssue(Long id) {
        return issueRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("issue.not.found"));
    }

    private void validateBorrowLimit(User user) {

        long activeIssues =
                issueRepo.countByUserIdAndStatus(
                        user.getId(), IssueStatus.ISSUED);

        if (activeIssues >= user.getMembership().getBorrowLimit())
            throw new BusinessException("borrow.limit.exceeded");
    }

    private void validateAvailability(Book book) {
        if (book.getAvailability() <= 0)
            throw new BusinessException("book.not.available");
    }

    private Issue buildIssue(User user, Book book) {

        LocalDate today = LocalDate.now();

        Issue issue = new Issue();
        issue.setUser(user);
        issue.setBook(book);
        issue.setIssueDate(today);

        issue.setDueDate(
                today.plusDays(
                        user.getMembership().getDurationDays()
                )
        );

        issue.setStatus(IssueStatus.ISSUED);

        return issue;
    }

    private void updateReturnDetails(Issue issue,
                                     IssueStatus status,
                                     double penalty) {

        issue.setReturnDate(LocalDate.now());
        issue.setPenalty(penalty);
        issue.setStatus(status);
    }

    private double calculatePenalty(Issue issue, IssueStatus status) {

        // LOST or DAMAGED → full MRP
        if (status == IssueStatus.LOST ||
                status == IssueStatus.DAMAGED)
            return issue.getBook().getMrp();

        // Overdue fine
        if (LocalDate.now().isAfter(issue.getDueDate())) {

            long overdueDays =
                    ChronoUnit.DAYS.between(
                            issue.getDueDate(),
                            LocalDate.now()
                    );

            return overdueDays *
                    issue.getUser()
                            .getMembership()
                            .getLateFeePerDay();
        }

        return 0;
    }

    private void updateAvailability(Book book, int delta) {
        book.setAvailability(
                book.getAvailability() + delta);
        bookRepo.save(book);
    }

    private IssueResponseDTO mapToDTO(Issue issue) {

        return IssueResponseDTO.builder()
                .issueId(issue.getId())
                .username(issue.getUser().getUsername())
                .bookTitle(issue.getBook().getTitle())
                .issueDate(issue.getIssueDate())
                .dueDate(issue.getDueDate())
                .returnDate(issue.getReturnDate())
                .penalty(issue.getPenalty())
                .status(issue.getStatus())
                .build();
    }
}