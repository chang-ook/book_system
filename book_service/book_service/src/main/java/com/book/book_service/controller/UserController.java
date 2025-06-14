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