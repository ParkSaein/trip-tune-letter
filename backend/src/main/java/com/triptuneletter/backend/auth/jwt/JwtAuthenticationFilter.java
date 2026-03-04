package com.triptuneletter.backend.auth.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            String header = request.getHeader("Authorization");

            // ✅ 토큰 없으면 그냥 통과 (permitAll 경로에서도 문제없게)
            if (header == null || !header.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = header.substring(7).trim();

            // ✅ 토큰 유효하지 않으면 인증 세팅 안 하고 통과
            if (!jwtProvider.validate(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            Claims claims = jwtProvider.getClaims(token);
            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            // role이 null일 때 대비 (원하면 기본 USER로)
            String safeRole = (role == null || role.isBlank()) ? "USER" : role;

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority("ROLE_" + safeRole);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(authority)
                    );

            SecurityContextHolder.getContext().setAuthentication(auth);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            // ✅ 토큰 파싱/만료/예외가 나도 회원가입/로그인 같은 요청이 죽지 않게
            log.warn("JWT filter error: {}", e.getMessage());
            filterChain.doFilter(request, response);
        }
    }
}