package com.book.book_service.service;

import com.book.book_service.domain.Book;
import com.book.book_service.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    //도서 목록 확인
    @Override
    public List<Book> findBooks() {
        return bookRepository.findAll();
    }

    // 등록 POST 제목, 내용, 커버 이미지
    @Override
    public Book insertBook(Book book) {
        return bookRepository.save(book);
    }

    // 도서 상세 정보 조회
    @Override
    public Book findBook(Long id) {
        return bookRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("책을 찾을 수 없습니다.")
        );
    }

    // 도서 수정
    @Override
    public Book updateBook(Long id, Book book) {
        Book b = findBook(id);

        b.setTitle(book.getTitle());
        b.setContents(book.getContents());
        return bookRepository.save(b);
    }

    // 도서 삭제
    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
