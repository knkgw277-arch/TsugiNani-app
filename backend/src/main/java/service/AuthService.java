package com.tsuginani.backend.service;

import com.tsuginani.backend.dto.RegisterRequest;
import com.tsuginani.backend.dto.RegisterResponse;
import com.tsuginani.backend.entity.User;
import com.tsuginani.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tsuginani.backend.dto.LoginRequest;
import com.tsuginani.backend.dto.LoginResponse;
import com.tsuginani.backend.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public RegisterResponse register(RegisterRequest request) {

        // ① メールアドレスの重複チェック
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("このメールアドレスは既に登録されています");
        }

        // ② パスワードをハッシュ化する
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // ③ Userエンティティを作って保存する
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(hashedPassword);
        // currentStepは今はまだ設定しない（次のタスクへ進むAPIを作る際に初期値を入れます)

        User savedUser = userRepository.save(user);

        // ④ レスポンス用のDTOに変換して返す
        return new RegisterResponse(savedUser.getUserId(), savedUser.getEmail(), "登録が完了しました");
        }

        public LoginResponse login(LoginRequest request) {

            // ① メールアドレスでユーザーを検索する（見つからなければエラー）
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("メールアドレスまたはパスワードが違います"));

            // ② パスワードが一致するか確認する（ハッシュ同士を比較する専用メソッドを使う）
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                throw new IllegalArgumentException("メールアドレスまたはパスワードが違います");
            }

            // ③ 認証成功なので、アクセストークンを発行する
            String token = jwtUtil.generateToken(user.getEmail());

            return new LoginResponse(token, "Bearer", "ログインに成功しました");
        }
    }