package com.tsuginani.backend.repository;

import com.tsuginani.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // step_orderの昇順（1, 2, 3...）でタスクを1件取得する（「次のタスク」を探すときに使用）
    Task findFirstByStepOrder(Integer stepOrder);
}
