package com.book.book_service.service;

import com.book.book_service.dto.UserDTO;

public interface UserService {

    void register(UserDTO.JoinRequest dto);
    String login(UserDTO.LoginRequest dto);
}