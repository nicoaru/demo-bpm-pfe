package com.asj.register.model.responses;

import com.asj.register.model.entities.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {


    private Integer id;
    private String title;
    private String description;
    private boolean validated;


    public static TaskResponse toResponse(Task taskEntity){
        return TaskResponse.builder()
                .id(taskEntity.getId())
                .title(taskEntity.getTitle())
                .description(taskEntity.getDescription())
                .validated(taskEntity.isValidated())
                .build();
    }

}