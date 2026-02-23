package com.library_management_system.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.library_management_system.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>,
                                         JpaSpecificationExecutor<Book> {
}
