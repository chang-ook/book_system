package com.book.book_service.dto;

import com.book.book_service.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class BookDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String title;
        private LocalDateTime uploadDate;
        private LocalDateTime updateDate;
        private String contents;
        private String coverImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Put {
        private String title;
        private LocalDateTime uploadDate;
        private LocalDateTime updateDate;
        private String contents;
        private String coverImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String title;
        private LocalDateTime uploadDate;
        private LocalDateTime updateDate;
        private String contents;
        private String coverImage;
    }
}
