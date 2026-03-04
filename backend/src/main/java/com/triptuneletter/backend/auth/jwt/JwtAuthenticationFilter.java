package com.triptuneletter.backend.auth.jwt;

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

import io.jsonwebtoken.Claims;

import java.io.IOException;


import java.util.List;

@Slf4j //로그를 의미함
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
            String token = header.substring(7);

            if (jwtProvider.validate(token)) {
                
                Claims claims = jwtProvider.getClaims(token);
                String email = claims.getSubject();
                String role = claims.get("role", String.class);

                SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority("ROLE_" + role);

               UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                        email,
                    null,
                        List.of(authority)
            );

    SecurityContextHolder.getContext().setAuthentication(auth);
}
        filterChain.doFilter(request, response);
    }
            }