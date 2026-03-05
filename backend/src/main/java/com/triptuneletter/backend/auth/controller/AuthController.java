package com.triptuneletter.backend.auth.controller;

import com.triptuneletter.backend.auth.dto.*;
import com.triptuneletter.backend.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authService;

        @PostMapping("/signup")
        public ResponseEntity<SignupResponse> signup(
                
                        @Valid @RequestBody SignupRequest request) {
System.out.println(">>> SIGNUP HIT");
                authService.signup(request);

                return ResponseEntity.ok(
                                new SignupResponse(200, "회원가입 성공"));
        }

        @PostMapping("/login")
        public ResponseEntity<LoginResponse> login(
                        @Valid @RequestBody LoginRequest request) {

                String token = authService.login(request);

                return ResponseEntity.ok(
                                new LoginResponse(200, "로그인 성공", token));
        }

        @DeleteMapping("/delete")
        public ResponseEntity<DeleteResponse> delete(
                        @AuthenticationPrincipal String email) {

                authService.delete(email);

                return ResponseEntity.ok(
                                new DeleteResponse(200, "회원 탈퇴 성공"));
        }

        // 로그아웃 (JWT 쓰면 프론트에서 토큰 삭제)
        @PostMapping("/logout")
        public ResponseEntity<ApiResponse> logout() {
                return ResponseEntity.ok(
                                new ApiResponse(200, "로그아웃 성공"));
        }
}
