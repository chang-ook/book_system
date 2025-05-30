package com.book.book_service.controller;

import com.book.book_service.domain.Book;
import com.book.book_service.dto.BookDTO;
import com.example.book.service.BookService;
import jakarta.validation.Valid;
import lombok.Getter;
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
        return null; //bookService.insertBook(dto);
    }

    @PatchMapping("/{bookId}")
    public Book updateBookStatus(@PathVariable("bookId")Long id, @Valid @RequestBody BookDTO.Patch dto){
        return null; //bookService.updateBookStatus(id,dto);
    }

    @PutMapping("/{bookId}")
    public Book updateBook(@PathVariable("bookId")Long id, @Valid @RequestBody BookDTO.Put dto){
        return null; //bookService.updateBook(id,dto);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable("bookid")Long id){
        //bookService.deleteBook(id);
    }

    @GetMapping("/{bookId}")
        public BookDTO.Response getBook(@PathVariable("bookid")Long id){
            return null; //bookService.findBook(id);
    }

    @GetMapping
    public List<BookDTO.Response> getBooks() {
        return null; //bookService.findBooks();
    }

}
