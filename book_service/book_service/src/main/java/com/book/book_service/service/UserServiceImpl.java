package com.book.book_service.service;

import com.book.book_service.domain.User;
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
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword()); // 👉 실제 서비스에선 암호화가 필요합니다!
        userRepository.save(user);
    }

    @Override
    public String login(UserDTO.LoginRequest dto) {
        Optional<User> optionalUser = userRepository.findByUsername(dto.getUsername());

        if (optionalUser.isPresent() &&
            optionalUser.get().getPassword().equals(dto.getPassword())) {

            return jwtTokenProvider.createToken(dto.getUsername());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
