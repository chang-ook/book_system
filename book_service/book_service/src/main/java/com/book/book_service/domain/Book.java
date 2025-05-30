package com.book.book_service.domain;

import com.book.book_service.dto.BookDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false, length = 64)
    private String title;

    @NotEmpty
    @Column(nullable = false)
    private LocalDate upload_date;

    @NotEmpty
    @Column(nullable = false)
    private LocalDate update_date;

    @NotEmpty
    @Column(length = 5000)
    private String contents;

    @Column
    private String cover_image;

    public static Book dtotoBook (BookDTO bookDTO){
        Book book = new Book();
        book.setTitle(book.getTitle());
        book.setContents(book.getTitle());
        return book;
    }
}
