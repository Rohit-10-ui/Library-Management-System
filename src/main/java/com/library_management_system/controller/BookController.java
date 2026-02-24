package com.library_management_system.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.library_management_system.entity.Book;
import com.library_management_system.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    // CREATE
    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book book) {
        Book created = service.create(book);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id,
                                       @RequestBody Book book) {
        Book updated = service.update(id, book);
        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@PathVariable Long id) {
        Book book = service.getById(id);
        return ResponseEntity.ok(book);
    }

    // PAGINATED + FILTER
    @GetMapping
    public ResponseEntity<Page<Book>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) String title) {

        Page<Book> books = service.getAll(page, size, genre, author, publisher, title);
        return ResponseEntity.ok(books);
    }
}
