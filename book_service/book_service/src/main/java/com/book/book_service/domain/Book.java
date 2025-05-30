package com.book.book_service.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

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

    @CreatedDate
    @Column(nullable = false)
    private Date upload_date;

    @LastModifiedDate
    @Column(nullable = false)
    private Date update_date;

    @NotEmpty
    @Column(length = 5000)
    private String contents;

    @Column
    private String cover_image;

}
