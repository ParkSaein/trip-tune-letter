package com.triptuneletter.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
   private int status;
   private String message;
   private String token;
}