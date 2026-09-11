package com.tsuginani.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // ① リクエストヘッダーから "Authorization" の中身を取り出す
        String authHeader = request.getHeader("Authorization");

        // ② "Bearer " で始まっていなければ、トークンなしとみなしてそのまま次へ進む
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ③ "Bearer " の7文字を取り除き、トークン本体だけを取り出す
        String token = authHeader.substring(7);

        // ④ トークンが有効かチェックする
        if (jwtUtil.validateToken(token)) {
            String email = jwtUtil.extractEmail(token);

            // ⑤ 「このリクエストはこのユーザーとしてログイン済みです」とSpringに伝える
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // ⑥ 次の処理へ進む
        filterChain.doFilter(request, response);
    }
}
