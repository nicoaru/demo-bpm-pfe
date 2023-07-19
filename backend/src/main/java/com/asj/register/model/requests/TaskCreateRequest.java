package com.asj.register.model.requests;

import com.asj.register.model.entities.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateRequest {
    @NotBlank(message = "Título no debe estar vacío")
    private String title;
    @NotBlank(message = "Descripción no debe estar vacío")
    private String description;


    public static Task toEntity(TaskCreateRequest taskCreateRequest){
        return Task.builder()
                .title(taskCreateRequest.getTitle())
                .description(taskCreateRequest.getDescription())
                .build();
    }

}