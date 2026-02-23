package com.library_management_system.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.library_management_system.entity.Book;
import com.library_management_system.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository repo;

    @Override
    public Book create(Book book) {
        return repo.save(book);
    }

    @Override
    public Book update(Long id, Book book) {
        Book existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        existing.setTitle(book.getTitle());
        existing.setSeries(book.getSeries());
        existing.setDescription(book.getDescription());
        existing.setPages(book.getPages());
        existing.setPublicationDate(book.getPublicationDate());
        existing.setLanguage(book.getLanguage());
        existing.setRating(book.getRating());
        existing.setRatings(book.getRatings());
        existing.setImageURL(book.getImageURL());
        existing.setGenre(book.getGenre());
        existing.setAuthor(book.getAuthor());
        existing.setPublisher(book.getPublisher());
        existing.setAvailability(book.getAvailability());

        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Book getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @Override
    public Page<Book> getAll(int page, int size,
                             String genre,
                             String author,
                             String publisher,
                             String title) {

        Pageable pageable = PageRequest.of(page, size);

        Specification<Book> spec = (root, query, cb) -> cb.conjunction();


        if (genre != null)
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("genre"), genre));

        if (author != null)
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("author"), author));

        if (publisher != null)
            spec = spec.and((root, q, cb) ->
                    cb.equal(root.get("publisher"), publisher));

        if (title != null)
            spec = spec.and((root, q, cb) ->
                    cb.like(cb.lower(root.get("title")),
                            "%" + title.toLowerCase() + "%"));

        return repo.findAll(spec, pageable);
    }
}
