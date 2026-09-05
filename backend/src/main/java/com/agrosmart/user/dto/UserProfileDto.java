package com.agrosmart.user.dto;

import com.agrosmart.user.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserProfileDto {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Role role;
    private String preferredLanguage;
    private Boolean isEmailVerified;
    private Boolean isPhoneVerified;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
