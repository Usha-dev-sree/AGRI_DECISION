package com.agrosmart.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Email or Phone cannot be blank")
    private String username; // can be email or phone

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
