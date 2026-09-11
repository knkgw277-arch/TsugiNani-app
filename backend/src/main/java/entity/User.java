package com.tsuginani.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // 現在取り組んでいるタスクへの参照（全件完了時はNULLを許容）
    @ManyToOne
    @JoinColumn(name = "current_step_id", referencedColumnName = "task_id")
    private Task currentStep;

    @Column(nullable = false)
    private boolean completed = false;

    // JPAが内部で使うための引数なしコンストラクタ
    public User() {
    }

    // ゲッター・セッター
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Task getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(Task currentStep) {
        this.currentStep = currentStep;
    }
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}