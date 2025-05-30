package com.book.book_service.domain;

import com.book.book_service.dto.BookDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false, length = 64)
    private String title;

    @CreatedDate
    @Column
    private LocalDate upload_date;

    @LastModifiedDate
    @Column
    private LocalDate update_date;

    @NotEmpty
    @Column(length = 5000)
    private String contents;

    @Column
    private String cover_image;

    public static Book dtotoBook (BookDTO.Post bookDTO){
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setContents(bookDTO.getContents());
        return book;
    }
}
