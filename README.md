# 도서관리시스템_27조

## 도메인 설계
<img src = "https://github.com/user-attachments/assets/6b59b502-1862-4015-92d4-634766dad17c" width="30%" height="30%">

## API명세서
<img src = "https://github.com/user-attachments/assets/423ccaa3-2909-4157-a6f7-6cd4bc968035" width="60%" height="60%">

## 회의록
[도서관리시스템 회의록](https://www.notion.so/202ea797346e80838c5af893b9449242?source=copy_link)


## 백엔드
### Domain
```java
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Book {
    //Primary key
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //제목
    @NotEmpty //제목은 비어 있을 수 없음
    @Column(nullable = false, length = 64)
    private String title;
    
    //생성날짜
    @CreatedDate //Entity 생성시 자동으로 날짜 확인
    @Column
    //데이터 포멧 설정
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime upload_date;
    
    //수정 날짜
    @LastModifiedDate //Entity 수정 시 자동으로 날짜 업데이트
    @Column
    //데이터 포멧 설정
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime update_date;
    
    //도서 내용
    @NotEmpty //내용은 비어 있을 수 없음
    @Column(length = 5000)
    private String contents;
    
    //도서 표지, url 형식으로 string 저장
    @Column(length = 50000)
    private String cover_image;
    
    //DTO로 book entity 생성
    public static Book dtotoBook (BookDTO.Post bookDTO){
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setContents(bookDTO.getContents());
        book.setCover_image(bookDTO.getCoverImage());
        return book;
    }
}
```
## BookController

'BookController'는책 등록, 조회, 수정, 삭제 기능을 제공하는 도서 관리 API
Spring Boot 기반 RESTful 구조로 설계되었으며, 프론트엔드(React 등)와 연동되며, `/api/v1/books` 경로를 통해 요청을 처리

---

### 주요 세부 사항

- `@RestController`, `@RequestMapping("api/v1/books")`를 사용하여 REST API로 동작
- `@CrossOrigin(origins = "http://localhost:3000")` 설정을 통해 CORS 문제 해결
- `@RequiredArgsConstructor`를 사용하여 `BookService` 의존성 주입
- `@Valid @RequestBody`를 통해 요청 본문 검증 처리

---

### 주요 기능

| HTTP Method | URI                   | 설명                       |
|-------------|------------------------|----------------------------|
| POST        | `/api/v1/books`        | 도서 등록 (책 정보 입력)     |
| PUT         | `/api/v1/books/{id}`   | 도서 수정 (기존 책 정보 수정) |
| DELETE      | `/api/v1/books/{id}`   | 도서 삭제                   |
| GET         | `/api/v1/books/{id}`   | 특정 도서 상세 조회          |
| GET         | `/api/v1/books`        | 전체 도서 목록 조회          |

---

### 전체 코드

```java
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
    public Book updateBook(@PathVariable("bookId") Long id, @Valid @RequestBody BookDTO.Put dto){
        return bookService.updateBook(id, dto);
    }

    @DeleteMapping("/{bookId}")
    public void deleteBook(@PathVariable("bookId") Long id){
        bookService.deleteBook(id);
    }

    @GetMapping("/{bookId}")
    public Book getBook(@PathVariable("bookId") Long id){
        return bookService.findBook(id);
    }

    @GetMapping
    public List<Book> getBooks() {
        return bookService.findBooks();
    }
}
```
### 메서드별 설명

- `insertBook(BookDTO.Post dto)`  
  → `POST /api/v1/books` 요청을 받아 도서를 등록. `BookDTO.Post`를 통해 제목, 내용, 표지 이미지 데이터를 전달받아 `Book` 객체로 저장

- `updateBook(Long id, BookDTO.Put dto)`  
  → `PUT /api/v1/books/{bookId}` 요청을 처리. 도서의 식별자(ID)를 경로로 받고, 수정할 데이터는 `BookDTO.Put`으로 전달받아 도서 정보를 갱신

- `deleteBook(Long id)`  
  → `DELETE /api/v1/books/{bookId}` 요청을 처리. 해당 ID에 해당하는 도서를 삭제

- `getBook(Long id)`  
  → `GET /api/v1/books/{bookId}` 요청을 통해 단일 도서 상세 정보를 반환

- `getBooks()`  
  → `GET /api/v1/books` 요청을 통해 전체 도서 목록을 조회

### 반환 객체

- 모든 API는 `Book` 도메인 객체를 JSON 형태로 반환
- 향후 응답의 일관성을 위해 `BookDTO.Response`로 리턴 타입을 리팩토링할 수 있음.

## BookDTO
`BookDTO`는 책 등록, 수정, 조회에 사용되는 데이터 전달 객체(Data Transfer Object)
API 요청(Request) 및 응답(Response) 시 클라이언트와 서버 간 데이터 전달을 위해 사용

---

### 주요 세부 사항
- `BookDTO`는 static 내부 클래스로 구성되어 역할별 DTO를 명확히 분리함
- `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`를 사용하여 필수 메서드 자동 생성
- 클라이언트 요청과 응답 시 `Book` 엔티티가 아닌 DTO를 사용하여 도메인 보호 및 유연성 확보

---

### 구성 클래스

| 클래스 이름         | 용도 설명                         |
|--------------------|----------------------------------|
| `BookDTO.Post`     | 도서 등록 요청에 사용되는 DTO      |
| `BookDTO.Put`      | 도서 수정 요청에 사용되는 DTO      |
| `BookDTO.Response` | 도서 응답 데이터 반환용 DTO        |

- `Post`  
  → `도서 등록 요청` 시 사용되는 DTO. 제목, 내용, 표지 이미지 정보 등을 포함하며, 컨트롤러에서 `@Valid @RequestBody`로 검증 처리된다.
- `Put`  
  → `도서 수정 요청` 시 사용되는 DTO. 등록과 동일한 필드 구조이며, 기존 도서를 업데이트할 때 사용된다.
- `Response`  
  → `도서 상세 조회 응답` 또는 리스트 조회 시 사용되는 DTO. 고유 ID를 포함하여 클라이언트에 책 정보를 전달한다.
---

### 필드 구성

#### BookDTO.Post / Put

| 필드명       | 타입     | 설명                           | 사용 클래스   |
|--------------|----------|--------------------------------|----------------|
| `title`      | String   | 도서 제목                      | Post, Put, Response |
| `contents`   | String   | 도서 내용 또는 소개             | Post, Put, Response |
| `coverImage` | String   | 도서 표지 이미지 경로 또는 URL  | Post, Put, Response |
| `id`         | Long     | 도서 고유 식별자 (응답용)       | Response only |

---

### 전체 코드

```java
package com.book.book_service.dto;

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
        private String contents;
        private String coverImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Put {
        private String title;
        private String contents;
        private String coverImage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String title;
        private String contents;
        private String coverImage;
    }
}
```
### 설계 의도

- 단일 BookDTO 클래스 내에 역할별 클래스를 정리하여 도서 도메인 관련 구조를 일관성 있게 유지
- 각 컨트롤러 메서드에서 필요한 DTO 타입만 명확하게 사용할 수 있도록 함
- 향후 `@NotBlank`, `@Size`, `@Pattern` 등의 유효성 검증 어노테이션을 추가하여 입력 값에 대한 제어 강화 가능

## GlobalExceptionHandler

### 주요 세부사항
- `@ControllerAdvice`를 이용하여 모든 컨트롤러에서 발생하는 예외를 한 곳에서 처리
- `EntityNotFoundException`, `IllegalArgumentException`, 일반 `Exception`을 각각 다른 HTTP 상태 코드로 응답
- 로깅을 통해 예외 발생 상황 기록

### 주요 기능

| 상황                  | HTTP 상태 코드                   | 설명                                        |
|----------------------|-----------------------------------|-----------------------------------------|
| 책이 없을 때 처리 | 404 NOT FOUND                 | 요청한 책이 존재하지 않음            |
| 잘못된 요청 처리  | 400 BAD REQUEST                | 요청 파라미터가 올바르지 않음      |
| 기타 예외 처리     | 500 INTERNAL SERVER ERROR | 서버 내부에서 알 수 없는 에러 발생 |


### 전체 코드
```java
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        log.warn("EntityNotFoundException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("ERROR 404: " + ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("IllegalArgumentException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("ERROR 400: " + ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("ERROR 500: 서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
}
```

## BookRepository

### 주요 세부사항
- Spring Data JPA의 `JpaRepository`를 상속하여 기본적인 CRUD 메서드를 자동으로 구현  
- `Book` 엔티티와 `Long` 타입의 기본 키를 대상으로 작동  
- 별도의 구현 없이 인터페이스 선언만으로 데이터베이스 접근 가능  

### 주요 기능

| 기능               | 설명                                    |
|--------------------|---------------------------------------|
| 데이터 조회        | 모든 책 목록 조회, 단일 책 조회 가능   |
| 데이터 등록        | 새로운 책 데이터 저장                   |
| 데이터 수정        | 기존 책 데이터 업데이트                 |
| 데이터 삭제        | 특정 책 데이터 삭제                     |

### 전체 코드

```java
package com.book.book_service.repository;

import com.book.book_service.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
```

## BookService

### 주요 세부사항
- 도서 관련 비즈니스 로직을 담당하는 서비스 계층  
- 도서 조회, 등록, 수정, 삭제 기능을 메서드로 정의  
- `BookRepository`를 통해 DB와 상호작용  
- 도서 조회 시, 없는 책에 대해서는 `EntityNotFoundException`을 발생시켜 전역 예외 처리기에서 처리

### 주요 기능

| 메서드명          | 기능 설명                          |
|-------------------|----------------------------------|
| `findBooks()`     | 전체 도서 목록 조회               |
| `insertBook()`    | 새로운 도서 등록                  |
| `findBook(Long id)` | 특정 ID의 도서 상세 조회 (없으면 예외 발생) |
| `updateBook(Long id, BookDTO.Put bookDTO)` | 특정 도서 정보 수정              |
| `deleteBook(Long id)` | 특정 도서 삭제                    |

### 전체 코드

```java
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
```

```java
package com.book.book_service.service;

import com.book.book_service.domain.Book;
import com.book.book_service.dto.BookDTO;
import com.book.book_service.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    // 도서 목록 확인
    @Override
    public List<Book> findBooks() {
        return bookRepository.findAll();
    }

    // 도서 등록 (POST) - 제목, 내용, 커버 이미지 포함
    @Override
    public Book insertBook(BookDTO.Post bookDTO) {
        return bookRepository.save(Book.dtotoBook(bookDTO));
    }

    // 도서 상세 정보 조회 (없으면 EntityNotFoundException 발생)
    @Override
    public Book findBook(Long id) {
        return bookRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("책을 찾을 수 없습니다.")
        );
    }

    // 도서 수정
    @Override
    public Book updateBook(Long id, BookDTO.Put bookDTO) {
        Book b = findBook(id);
        b.setTitle(bookDTO.getTitle());
        b.setContents(bookDTO.getContents());
        b.setCover_image(bookDTO.getCoverImage());
        return bookRepository.save(b);
    }

    // 도서 삭제
    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
```


## 프론트엔드

##`BookForm.jsx`

## 도메인 설계
<img src="https://github.com/user-attachments/assets/6b59b502-1862-4015-92d4-634766dad17c" width="30%" height="30%">

## API명세서
<img src="https://github.com/user-attachments/assets/423ccaa3-2909-4157-a6f7-6cd4bc968035" width="60%" height="60%">

## 회의록
[도서관리시스템 회의록](https://www.notion.so/202ea797346e80838c5af893b9449242?source=copy_link)

---

## 프론트엔드
React 기반의 도서 등록 및 표지 이미지 생성 기능을 제공하는 UI입니다. 사용자가 입력한 도서 정보를 기반으로 OpenAI API를 호출하여 표지를 자동 생성하고, 해당 정보를 백엔드 서버로 전송합니다.

### 주요 기능
- 사용자 입력으로 책 제목, 내용 등록
- OpenAI GPT-4o를 통한 번역 요청
- DALL·E 이미지 생성 API로 표지 생성
- 표지 미리보기 및 재생성
- 최종 등록 시 Spring Boot 백엔드로 POST 요청 전송

### 사용 기술
- React
- Axios
- Material UI
- OpenAI GPT-4o + DALL·E API

### 파일: `BookForm.jsx`
```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, CircularProgress
} from '@mui/material';

function BookForm() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleImageGenerate = async () => {
    if (!apiKey) return alert('API 키를 입력해주세요.');
    if (!title || !contents) return alert('제목과 내용을 먼저 입력해주세요.');

    try {
      const translationResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Translate the following book title and description into English:\n\n제목: ${title}\n내용: ${contents}`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const translatedText = translationResponse.data.choices[0].message.content;
      const lines = translatedText.split('\n').filter(Boolean);
      const translatedTitle = lines.find(line => line.toLowerCase().startsWith('title:'))?.split(':')[1]?.trim() || title;
      const translatedContents = lines.find(line => line.toLowerCase().startsWith('description:'))?.split(':')[1]?.trim() || contents;

      const generatedPrompt = `Create a professional book cover illustration based on the following details:\n\nTitle: \"${translatedTitle}\"\nDescription: \"${translatedContents}\"\n\nStyle: Modern and clean book cover design. Focus on visual storytelling that reflects the book's theme. Use realistic or semi-realistic elements. Avoid text or title in the image.\n\nThe image should resemble a real book cover artwork, suitable for use on printed or digital books. Use appropriate colors, composition, and mood to reflect the story genre and tone.`;

      setIsLoading(true);

      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: generatedPrompt,
          n: 1,
          size: '512x512'
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const image = response.data.data[0].url;
      setImageUrl(image);
      setIsLoading(false);
      handleCloseDialog();

    } catch (error) {
      console.error(error);
      alert('이미지 생성 실패');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/books', {
      title,
      contents,
      coverImage: imageUrl
    }).then(() => {
      alert('등록 완료');
      navigate('/');
    }).catch(err => console.error(err));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>... (생략된 렌더링 UI는 원본 코드 참조)</div>
  );
}

export default BookForm;
```

---

> 전체 시스템은 도메인, API 명세서, 백엔드(Spring Boot) 구조와 완전하게 연동되며, 이 프론트엔드는 `localhost:3000`에서 실행하여 `localhost:8080` 서버와 통신합니다.

---
