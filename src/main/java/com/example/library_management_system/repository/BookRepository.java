package com.example.library_management_system.repository;

import com.example.library_management_system.entity.Book;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>,
                                         JpaSpecificationExecutor<Book> {
}
