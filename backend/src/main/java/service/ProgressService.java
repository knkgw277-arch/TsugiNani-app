package com.tsuginani.backend.service;

import com.tsuginani.backend.dto.ProgressResponse;
import com.tsuginani.backend.dto.TaskResponse;
import com.tsuginani.backend.entity.Task;
import com.tsuginani.backend.entity.User;
import com.tsuginani.backend.repository.TaskRepository;
import com.tsuginani.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public ProgressService(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    // メールアドレスから、そのユーザーの現在の進捗状況を組み立てて返す
    public ProgressResponse getProgress(String email) {
        User user = findUserByEmail(email);
        return buildProgressResponse(user);
    }

    // 「次のタスクへ進む」処理
    public ProgressResponse advanceToNextStep(String email) {
        User user = findUserByEmail(email);

        int currentOrder = (user.getCurrentStep() == null) ? 0 : user.getCurrentStep().getStepOrder();
        int nextOrder = currentOrder + 1;

        Task nextTask = taskRepository.findFirstByStepOrder(nextOrder);

        user.setCurrentStep(nextTask);
        if (nextTask == null) {
            // 次のタスクが見つからなかった = 全タスク完了
            user.setCompleted(true);
        }
        userRepository.save(user);

        return buildProgressResponse(user);
    }

    // 進捗をリセットする処理（最初からやり直す）
    public ProgressResponse resetProgress(String email) {
        User user = findUserByEmail(email);
        user.setCurrentStep(null);
        user.setCompleted(false);
        userRepository.save(user);
        return buildProgressResponse(user);
    }

    // メールアドレスからUserを探す共通処理
    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("ユーザーが見つかりません"));
    }

    // Userの状態から、レスポンス用のProgressResponseを組み立てる共通処理
    private ProgressResponse buildProgressResponse(User user) {
        long totalSteps = taskRepository.count();
        Task currentStep = user.getCurrentStep();

        if (currentStep == null) {
            boolean isCompleted = user.isCompleted();
            return new ProgressResponse(null, isCompleted ? (int) totalSteps : 0, (int) totalSteps, isCompleted);
        }

        TaskResponse taskResponse = new TaskResponse(
                currentStep.getTaskId(),
                currentStep.getTitle(),
                currentStep.getDescription(),
                currentStep.getStepOrder()
        );

        return new ProgressResponse(taskResponse, currentStep.getStepOrder(), (int) totalSteps, false);
    }

    // 「一度も次へ進んだことがないユーザー」と「全部完了したユーザー」を区別するための簡易チェック
    // 今回は簡略化のため、常にfalse（=未着手）として扱う
    private boolean hasEverStarted(User user) {
        return false;
    }
}
