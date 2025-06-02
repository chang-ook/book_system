package com.book.book_service.service;

import com.book.book_service.domain.Users;
import com.book.book_service.dto.UserDTO;
import com.book.book_service.repository.UserRepository;
import com.book.book_service.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void register(UserDTO.JoinRequest dto) {
        Users user = new Users();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        userRepository.save(user);
    }

    @Override
    public String login(UserDTO.LoginRequest dto) {
        Optional<Users> optionalUser = userRepository.findByUsername(dto.getUsername());

        if (optionalUser.isPresent() &&
            optionalUser.get().getPassword().equals(dto.getPassword())) {

            return jwtTokenProvider.createToken(dto.getUsername());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
