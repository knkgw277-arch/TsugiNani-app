package com.tsuginani.backend.controller;

import com.tsuginani.backend.dto.TaskResponse;
import com.tsuginani.backend.entity.Task;
import com.tsuginani.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        // step_orderの昇順に並び替えてから、レスポンス用DTOに変換する
        return tasks.stream()
                .sorted(Comparator.comparing(Task::getStepOrder))
                .map(task -> new TaskResponse(
                        task.getTaskId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStepOrder()
                ))
                .collect(Collectors.toList());
    }
}
