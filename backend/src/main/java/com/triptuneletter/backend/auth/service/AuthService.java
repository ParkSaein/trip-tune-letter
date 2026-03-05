package com.triptuneletter.backend.auth.service;

import com.triptuneletter.backend.auth.dto.LoginRequest;
import com.triptuneletter.backend.auth.dto.LoginResult;
import com.triptuneletter.backend.auth.dto.SignupRequest;
import com.triptuneletter.backend.auth.entity.Member;
import com.triptuneletter.backend.auth.entity.Status;
import com.triptuneletter.backend.auth.jwt.JwtProvider;
import com.triptuneletter.backend.auth.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public void signup(SignupRequest request) {

        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        if (memberRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        Member member = new Member(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getName(),
                request.getNickname());
        memberRepository.save(member);
    }

    // ✅ 여기만 핵심 변경: String -> LoginResult
    public LoginResult login(LoginRequest request) {

        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        if (member.getStatus() == Status.INACTIVE) {
            throw new IllegalArgumentException("탈퇴한 회원입니다.");
        }

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String role = member.getRole().name();
        String token = jwtProvider.createToken(member.getEmail(), role);

        return new LoginResult(token, role);
    }

    public void delete(String email) {

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        member.deactivate();
        memberRepository.save(member);
    }
}