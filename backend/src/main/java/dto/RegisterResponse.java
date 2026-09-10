package com.tsuginani.backend.dto;

public class RegisterResponse {

    private Long userId;
    private String email;
    private String message;

    // 全項目を一度に設定できる、値ありコンストラクタ
    public RegisterResponse(Long userId, String email, String message) {
        this.userId = userId;
        this.email = email;
        this.message = message;
    }

    // ゲッター（レスポンスは返すだけなのでセッターは不要）
    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }
}
