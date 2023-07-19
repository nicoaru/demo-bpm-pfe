package com.asj.register.services.interfaces;

import com.asj.register.model.entities.Task;
import com.asj.register.model.requests.TaskCreateRequest;
import com.asj.register.model.requests.TaskUpdateRequest;
import com.asj.register.model.responses.TaskResponse;

public interface ITaskService {

    TaskResponse createTask(TaskCreateRequest taskRequest);

    TaskResponse getTaskById(Integer taskId);

    TaskResponse validateTask(Integer taskId);

    TaskResponse updateTask(TaskUpdateRequest taskUpdate, Integer taskId);

    Integer getTaskHours(Integer taskId);
}
