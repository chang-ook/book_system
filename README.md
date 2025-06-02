# 도서관리시스템_27조

## 도메인 설계
<img src = "https://github.com/user-attachments/assets/dc31f690-c1c2-46f6-8261-805a68e75c6b" width="50%" height="30%">

## API명세서
<img src = "https://github.com/user-attachments/assets/423ccaa3-2909-4157-a6f7-6cd4bc968035" width="60%" height="60%">

## 회의록
[도서관리시스템 회의록](https://www.notion.so/202ea797346e80838c5af893b9449242?source=copy_link)


## 백엔드
### Domain-Book
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

    //Users Entity와 다대일 매핑
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
    
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
### User
```java
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    
    //Book Entity와 일대다 매핑
    @OneToMany
    private List<Book> books;
}
```
## UserController

`UserController`는 사용자 회원가입과 로그인을 처리하는 API입니다.  
Spring Boot 기반 RESTful 구조로 설계되었으며, 프론트엔드(React 등)와 연동되며, `/api/v1/users` 경로를 통해 요청을 처리합니다.

---

### 주요 세부 사항

- `@RestController`, `@RequestMapping("/api/v1/users")`를 사용하여 REST API로 동작
- `@CrossOrigin(origins = "http://localhost:3000")` 설정을 통해 CORS 문제 해결
- `@RequiredArgsConstructor`를 사용하여 `UserService` 의존성 주입
- 클라이언트로부터 받은 JSON 요청을 DTO로 매핑하여 처리

---

### 주요 기능

| HTTP Method | URI                      | 설명                         |
|-------------|---------------------------|------------------------------|
| POST        | `/api/v1/users/register`  | 사용자 회원가입 처리           |
| POST        | `/api/v1/users/login`     | 사용자 로그인 및 JWT 발급 처리  |

---

### 전체 코드

```java
package com.book.book_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.book.book_service.dto.UserDTO;
import com.book.book_service.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping("/register")
  public void register(@RequestBody UserDTO.JoinRequest dto) {
    userService.register(dto);
  }

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody UserDTO.LoginRequest dto) {
    String token = userService.login(dto);
    return Map.of("token", token);
  }
}
```
### 메서드별 설명
- register(UserDTO.JoinRequest dto)
→ POST /api/v1/users/register 요청을 받아 회원가입을 처리.
UserDTO.JoinRequest를 통해 사용자명(username), 비밀번호(password)를 전달받고 회원 등록을 수행.

- login(UserDTO.LoginRequest dto)
→ POST /api/v1/users/login 요청을 받아 로그인을 처리.
UserDTO.LoginRequest의 정보를 기반으로 UserService에서 검증 및 JWT 발급.


## UserDTO

`UserDTO`는 사용자 회원가입, 로그인, 사용자 정보 조회와 관련된 요청 및 응답 데이터를 전달하기 위한 DTO 클래스입니다.
각 목적에 따라 내부 static 클래스로 구성되어 있어, 역할별 데이터 구조가 명확하게 분리되어 있습니다.

### 주요 세부 사항

- `UserDTO.JoinRequest` : 사용자 회원가입 요청 시 사용
- `UserDTO.LoginRequest` : 사용자 로그인 요청 시 사용
- `UserDTO.InfoResponse` : 사용자 정보 응답 시 사용
- Lombok 어노테이션으로 생성자, Getter, Setter 자동 생성

---

### 구성 클래스

| 클래스명               | 용도 설명                         |
        |------------------------|----------------------------------|
        | `UserDTO.JoinRequest`  | 사용자 회원가입 시 사용되는 요청 DTO |
        | `UserDTO.LoginRequest` | 사용자 로그인 시 사용되는 요청 DTO   |
        | `UserDTO.InfoResponse` | 사용자 정보 조회 응답용 DTO          |

---

### 전체 코드

```java
package com.book.book_service.dto;

import lombok.*;

public class UserDTO {

  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class JoinRequest {
    private String username;
    private String password;
  }

  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class LoginRequest {
    private String username;
    private String password;
  }

  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class InfoResponse {
    private Long user_id;
    private String username;
  }
}
```
### 필드 설명
- register(UserDTO.JoinRequest dto)
→ POST /api/v1/users/register 요청을 받아 회원가입을 처리.
UserDTO.JoinRequest를 통해 사용자명(username), 비밀번호(password)를 전달받고 회원 등록을 수행.

- login(UserDTO.LoginRequest dto)
→ POST /api/v1/users/login 요청을 받아 로그인을 처리.
UserDTO.LoginRequest의 정보를 기반으로 UserService에서 검증 및 JWT 발급.

### 설계 의도
- 요청(Request)과 응답(Response)을 명확히 분리하여 각 역할에 맞는 데이터 전달
- 도메인(User) 객체를 직접 노출하지 않고, 필요한 필드만 추출하여 API 안정성 확보
- DTO마다 @Getter, @Setter, @NoArgsConstructor, @AllArgsConstructor를 사용해 코드 간결성 유지
- 추후 @NotBlank, @Size, @Pattern 등의 유효성 검증 어노테이션 추가도 용이

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
React 기반의 도서 등록 및 표지 이미지 생성 기능을 제공하는 UI입니다. 사용자가 입력한 도서 정보를 기반으로 OpenAI API를 호출하여 표지를 자동 생성하고, 해당 정보를 백엔드 서버로 전송합니다.

## BookForm.jsx

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

## DetailPage / BookDetail 컴포넌트

### DetailPage.jsx
- 전체 페이지의 배경 색상과 레이아웃을 설정합니다.
- 가운데 정렬된 카드 스타일의 컨테이너 안에 `BookDetail` 컴포넌트를 렌더링합니다.
- 사용자 친화적인 UI 디자인으로 도서 상세 정보를 깔끔하게 표현합니다.

### BookDetail.jsx
- 도서 정보를 API 서버(`http://localhost:8080/api/v1/books/:id`)에서 받아와 화면에 출력합니다.
- React Router의 `useParams()`를 이용해 URL에서 도서 ID를 가져옵니다.
- `axios`를 사용하여 서버에 GET/DELETE 요청을 보냅니다.
- `MUI`의 `Button` 컴포넌트를 활용한 액션 버튼 제공.
- 삭제, 수정, 목록 페이지 이동 기능을 제공합니다.

---

### 주요 기능

| 기능 | 설명 |
|------|------|
| 도서 상세 조회 | 도서 제목, 내용, 등록일, 수정일, 표지 이미지를 포함한 상세 정보 표시 |
| 도서 표지 이미지 | 반응형으로 조정되는 도서 표지 이미지 표시 |
| 도서 수정 기능 | 수정 버튼 클릭 시 `/books/edit/:id` 경로로 이동 |
| 도서 삭제 기능 | 삭제 버튼 클릭 시 서버에 DELETE 요청 후 목록 페이지로 이동 |
| 목록 보기 | 도서 목록 페이지(`/`)로 이동 |
| 예외 처리 | 로딩 중 상태 표시, 에러 발생 시 콘솔 출력 |

---

### 사용 기술

- **React** - UI 구성 및 상태 관리
- **React Router Dom** - 라우팅 처리 (`useParams`, `useNavigate`)
- **Axios** - 비동기 HTTP 통신
- **Material-UI (MUI)** - 버튼 컴포넌트 및 디자인 요소 활용
- **CSS-in-JS** - 인라인 스타일링으로 빠른 UI 커스터마이징

---

### UI 미리보기

- 페이지 중앙에 화이트 카드 형태의 도서 상세 정보 박스 제공
- 왼쪽에는 도서 표지, 오른쪽에는 텍스트 및 버튼들이 정렬됨
- 반응형 레이아웃 및 부드러운 색감 적용 (`#e6f7f4` 배경)

---
