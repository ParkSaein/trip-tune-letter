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
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        System.out.println(">>> SIGNUP HIT");
        authService.signup(request);
        return ResponseEntity.ok(new SignupResponse(200, "회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        // ✅ token+role 받기
        LoginResult result = authService.login(request);

        // ✅ role도 같이 내려주기
        return ResponseEntity.ok(
            new LoginResponse(200, "로그인 성공", result.getToken(), result.getRole())
        );
    }

    @DeleteMapping("/delete")
    public ResponseEntity<DeleteResponse> delete(@AuthenticationPrincipal String email) {
        authService.delete(email);
        return ResponseEntity.ok(new DeleteResponse(200, "회원 탈퇴 성공"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        return ResponseEntity.ok(new ApiResponse(200, "로그아웃 성공"));
    }
}