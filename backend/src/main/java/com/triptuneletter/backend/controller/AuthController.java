package com.triptuneletter.backend.controller;

import com.triptuneletter.backend.model.User;
import com.triptuneletter.backend.repository.UserRepository;
import com.triptuneletter.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody Map<String, String> request) {
        if(userRepository.findByUsername(request.get("username")).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = User.builder()
                .username(request.get("username"))
                .password(passwordEncoder.encode(request.get("password")))
                .role("USER")
                .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("token", token);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.get("username"),
                        request.get("password")
                )
        );
        String token = jwtUtil.generateToken(request.get("username"));
        return Map.of("token", token);
    }
}