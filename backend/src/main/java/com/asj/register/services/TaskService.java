package com.asj.register.services;

import com.asj.register.exceptions.custom_exceptions.NotFoundException;
import com.asj.register.model.entities.Task;
import com.asj.register.model.requests.TaskCreateRequest;
import com.asj.register.model.requests.TaskUpdateRequest;
import com.asj.register.model.responses.TaskResponse;
import com.asj.register.model.responses.TasksCountResponse;
import com.asj.register.repositories.TaskRepository;
import com.asj.register.services.interfaces.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;

    @Override
    public TaskResponse createTask(TaskCreateRequest taskRequest) {
        Task task = TaskCreateRequest.toEntity(taskRequest);
        return TaskResponse.toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse getTaskById(Integer taskId) {
        return TaskResponse.toResponse(taskRepository.findById(taskId).orElseThrow(() -> new NotFoundException("Tarea no encontrada")));
    }

    @Override
    public TaskResponse validateTask(Integer taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(()-> new NotFoundException("Tarea no encontrada"));
        task.setValidated(true);
        return TaskResponse.toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse updateTask(TaskUpdateRequest taskUpdate, Integer taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new NotFoundException("No se encontró la tarea"));
        task.setDescription(taskUpdate.getDescription());
        task.setTitle(taskUpdate.getTitle());
        return TaskResponse.toResponse(taskRepository.save(task));
    }

    @Override
    public Integer getTaskHours(Integer taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new NotFoundException("Tarea no encontrada"));

        return task.getHours();
    }

    @Override
    public TasksCountResponse getTaskCount() {
        return TasksCountResponse.toResponse(taskRepository.count());
    }

}
