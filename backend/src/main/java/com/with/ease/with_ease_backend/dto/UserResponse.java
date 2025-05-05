package com.with.ease.with_ease_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String role;

    private String name;
    private Integer age;
    private String gender;
    private String occupation;
    private String healthInfo;
    private List<String> goals;
    private boolean profileCompleted;


}
