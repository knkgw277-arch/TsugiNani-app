package com.tsuginani.backend.dto;

public class TaskResponse {

    private Long taskId;
    private String title;
    private String description;
    private Integer stepOrder;

    public TaskResponse(Long taskId, String title, String description, Integer stepOrder) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.stepOrder = stepOrder;
    }

    public Long getTaskId() {
        return taskId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }
}
