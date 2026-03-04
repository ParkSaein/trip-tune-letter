package com.triptuneletter.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteResponse {
    private int status;
    private String message;
}