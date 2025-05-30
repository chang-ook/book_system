package com.book.book_service.service;

import com.book.book_service.domain.Book;
import com.book.book_service.dto.BookDTO;

import java.util.List;

public interface BookService {
    List<Book> findBooks();
    Book insertBook(BookDTO.Post bookDTO);
    Book findBook(Long id);
    Book updateBook(Long id, BookDTO.Put bookDTO);
    void deleteBook(Long id);
}
