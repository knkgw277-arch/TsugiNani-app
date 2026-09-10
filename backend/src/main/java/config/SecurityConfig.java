package com.tsuginani.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // パスワードを暗号化（ハッシュ化）するための部品を、アプリ全体で使えるように登録する
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // どのAPIに認証（ログイン）が必要かを決める設定
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 今回はJSONでやり取りするAPIのみなので、CSRF対策（画面フォーム向けの仕組み）は無効化する
                .csrf(csrf -> csrf.disable())
                // セッション（ログイン状態の保持）を使わず、リクエストごとに独立させる（今後トークン認証にするため）
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 会員登録・ログインAPIだけは、ログインしていなくても呼び出せるようにする
                        .requestMatchers("/api/auth/**", "/error").permitAll()
                        // それ以外のAPIは、今後トークンによるログイン確認が必要になる
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
