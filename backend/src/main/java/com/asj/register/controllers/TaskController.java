package com.asj.register.controllers;

import com.asj.register.model.entities.Task;
import com.asj.register.model.requests.TaskCreateRequest;
import com.asj.register.model.requests.TaskUpdateRequest;
import com.asj.register.model.requests.UserCreateRequest;
import com.asj.register.model.requests.UserUpdateRequest;
import com.asj.register.model.responses.TaskResponse;
import com.asj.register.model.responses.UserResponse;
import com.asj.register.services.UserService;
import com.asj.register.services.interfaces.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin("*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final ITaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Validated @RequestBody TaskCreateRequest newTask) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(newTask));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Integer taskId) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getTaskById(taskId));
    }

    @PutMapping("/validate/{taskId}")
    public ResponseEntity<TaskResponse> validateTask(@PathVariable Integer taskId){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.validateTask(taskId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Integer taskId, @RequestBody TaskUpdateRequest updateTask){
        return ResponseEntity.status(HttpStatus.OK).body(taskService.updateTask(updateTask, taskId));
    }

    @GetMapping("/{taskId}/hours")
    public ResponseEntity<Integer> getTaskHours(@PathVariable Integer taskId) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getTaskHours(taskId));
    }
}
