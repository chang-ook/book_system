package com.book.book_service.service;

import com.book.book_service.domain.Book;

import java.util.List;

public interface BookService {
    List<Book> findBooks();
    Book insertBook(Book book);
    Book findBook(Long id);
    Book updateBook(Long id, Book book);
    void deleteBook(Long id);
}
