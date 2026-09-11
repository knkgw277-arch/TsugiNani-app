package com.tsuginani.backend.dto;

public class ProgressResponse {

    private TaskResponse currentTask;
    private int currentStepOrder;
    private int totalSteps;
    private boolean completed;

    public ProgressResponse(TaskResponse currentTask, int currentStepOrder, int totalSteps, boolean completed) {
        this.currentTask = currentTask;
        this.currentStepOrder = currentStepOrder;
        this.totalSteps = totalSteps;
        this.completed = completed;
    }

    public TaskResponse getCurrentTask() {
        return currentTask;
    }

    public int getCurrentStepOrder() {
        return currentStepOrder;
    }

    public int getTotalSteps() {
        return totalSteps;
    }

    public boolean isCompleted() {
        return completed;
    }
}
