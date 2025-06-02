package com.book.book_service.controller;

import com.book.book_service.domain.Book;
import com.book.book_service.dto.BookDTO;
import com.book.book_service.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/books")
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

//    // 글로벌 예외 처리 테스트용 엔드포인트
//    @GetMapping("/test/notfound")
//    public Book testEntityNotFoundException() {
//        throw new jakarta.persistence.EntityNotFoundException("테스트: 책을 찾을 수 없습니다!");
//    }
//
//    @GetMapping("/test/illegal")
//    public String testIllegalArgument() {
//        throw new IllegalArgumentException("테스트: 잘못된 요청입니다.");
//    }
//
//    @GetMapping("/test/general")
//    public void testGeneralException() throws Exception {
//        throw new Exception("테스트: 알 수 없는 예외 발생");
//    }
}
