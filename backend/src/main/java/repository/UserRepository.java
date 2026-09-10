package com.tsuginani.backend.repository;

import com.tsuginani.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // メールアドレスでユーザーを検索する（ログイン・重複チェックで使用）
    Optional<User> findByEmail(String email);

    // メールアドレスがすでに登録されているか確認する
    boolean existsByEmail(String email);
}
