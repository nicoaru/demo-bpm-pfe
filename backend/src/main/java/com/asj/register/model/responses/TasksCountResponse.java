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
public class TasksCountResponse {

    private Long tasksCount;


    public static TasksCountResponse toResponse(Long tasksCount){
        return TasksCountResponse.builder()
                .tasksCount(tasksCount)
                .build();
    }

}