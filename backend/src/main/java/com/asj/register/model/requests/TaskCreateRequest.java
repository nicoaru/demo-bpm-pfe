package com.asj.register.model.requests;

import com.asj.register.model.entities.Task;
import com.asj.register.model.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

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