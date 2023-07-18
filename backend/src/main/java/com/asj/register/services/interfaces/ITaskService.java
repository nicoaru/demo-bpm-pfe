package com.asj.register.services.interfaces;

import com.asj.register.model.entities.Task;
import com.asj.register.model.requests.TaskCreateRequest;

public interface ITaskService {

    Task createTask(TaskCreateRequest taskRequest);
    Task validateTask(Integer taskId);
}
