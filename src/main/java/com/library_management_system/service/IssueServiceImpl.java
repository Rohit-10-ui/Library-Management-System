package com.library_management_system.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
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
        User user = getLoggedInUser();
        Book book = getBook(dto.getBookId());
        validateBorrow(user);
        validateAvailability(book);

        Issue issue = createIssue(user, book);
        updateAvailability(book, -1);

        log.info("Book issued: {}", book.getTitle());
        return mapToDTO(issueRepo.save(issue));
    }

    @Override
    public IssueResponseDTO returnBook(ReturnRequestDTO dto) {

        Issue issue = getIssue(dto.getIssueId());
        Book book = issue.getBook();

        double penalty = calculatePenalty(issue, dto.getStatus());

        issue.setReturnDate(LocalDate.now());
        issue.setPenalty(penalty);
        issue.setStatus(dto.getStatus());

        updateAvailability(book, 1);

        log.info("Book returned: {}", book.getTitle());
        return mapToDTO(issueRepo.save(issue));
    }

    @Override
    public List<IssueResponseDTO> getCurrentIssued() {
        return issueRepo.findByStatus(IssueStatus.ISSUED)
                .stream().map(this::mapToDTO).toList();
    }

    @Override
    public List<IssueResponseDTO> getHistory(Long userId) {
        return issueRepo.findByUserId(userId)
                .stream().map(this::mapToDTO).toList();
    }

    private User getLoggedInUser() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("user.not.found"));
    }

    private Book getBook(Long id) {
        return bookRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("book.not.found"));
    }

    private Issue getIssue(Long id) {
        return issueRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("issue.not.found"));
    }

    private void validateBorrow(User user) {
        long active = issueRepo.countByUserIdAndStatus(
                user.getId(), IssueStatus.ISSUED);

        if (active >= user.getMembership().getBorrowLimit())
            throw new BusinessException("borrow.limit.exceeded");
    }

    private void validateAvailability(Book book) {
        if (book.getAvailability() <= 0)
            throw new BusinessException("book.not.available");
    }

    private Issue createIssue(User user, Book book) {
        Issue issue = new Issue();
        issue.setUser(user);
        issue.setBook(book);
        issue.setIssueDate(LocalDate.now());
        issue.setDueDate(LocalDate.now()
                .plusDays(user.getMembership().getDurationDays()));
        issue.setStatus(IssueStatus.ISSUED);
        return issue;
    }

    private double calculatePenalty(Issue issue, IssueStatus status) {

        if (status == IssueStatus.LOST || status == IssueStatus.DAMAGED)
            return issue.getBook().getMrp();

        if (LocalDate.now().isAfter(issue.getDueDate())) {
            long days = ChronoUnit.DAYS.between(
                    issue.getDueDate(), LocalDate.now());
            return days *
                    issue.getUser().getMembership().getLateFeePerDay();
        }
        return 0;
    }

    private void updateAvailability(Book book, int delta) {
        book.setAvailability(book.getAvailability() + delta);
        bookRepo.save(book);
    }

    private IssueResponseDTO mapToDTO(Issue issue) {
        return IssueResponseDTO.builder()
                .issueId(issue.getId())
                .bookTitle(issue.getBook().getTitle())
                .issueDate(issue.getIssueDate())
                .dueDate(issue.getDueDate())
                .returnDate(issue.getReturnDate())
                .penalty(issue.getPenalty())
                .status(issue.getStatus())
                .build();
    }
}