package com.book.book_service.controller;

import com.book.book_service.domain.Book;
import com.book.book_service.dto.BookDTO;
import com.book.book_service.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;


    @PostMapping
    public Book insertBook(@Valid @RequestBody BookDTO.Post dto){
        return bookService.insertBook(dto);
    }


    @PutMapping("/{bookId}")
    public Book updateBook(@PathVariable("bookId")Long id, @Valid @RequestBody BookDTO.Put dto){
        return bookService.updateBook(id,dto);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable("bookId")Long id){
       bookService.deleteBook(id);
    }

    @GetMapping("/{bookId}")
    public Book getBook(@PathVariable("bookId")Long id){
        return bookService.findBook(id);
    }

    @GetMapping
    public List<Book> getBooks() {
        return bookService.findBooks();
    }

}
