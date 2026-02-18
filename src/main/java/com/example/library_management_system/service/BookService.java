package com.example.library_management_system.service;

import com.example.library_management_system.entity.Book;
import org.springframework.data.domain.Page;

public interface BookService {

    Book create(Book book);

    Book update(Long id, Book book);

    void delete(Long id);

    Book getById(Long id);

    Page<Book> getAll(int page, int size,
                      String genre,
                      String author,
                      String publisher,
                      String title);
}
