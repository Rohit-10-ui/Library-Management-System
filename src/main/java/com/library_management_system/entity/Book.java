package com.library_management_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String series;

    @Column(length = 2000)
    private String description;

    private Integer pages;

    private LocalDate publicationDate;

    private String language;

    private Double rating;

    private Integer ratings;

    private String imageURL;

    private String genre;

    private String author;

    private String publisher;

    private Integer availability; // number of copies available
    private Double mrp;
}
