package com.tsuginani.backend.service;

import com.tsuginani.backend.dto.RegisterRequest;
import com.tsuginani.backend.dto.RegisterResponse;
import com.tsuginani.backend.entity.User;
import com.tsuginani.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // コンストラクタで必要な部品（Repository・PasswordEncoder）を受け取る
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
}
