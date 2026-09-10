package com.tsuginani.backend.dto;

public class LoginResponse {

    private String accessToken;
    private String tokenType;
    private String message;

    public LoginResponse(String accessToken, String tokenType, String message) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getMessage() {
        return message;
    }
}
