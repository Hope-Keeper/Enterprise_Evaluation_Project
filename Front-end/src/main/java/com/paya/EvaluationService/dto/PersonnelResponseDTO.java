package com.Reihan.EvaluationService.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonnelResponseDTO {

    private String correlationId;
    private List<? extends BasePersonnelDTO> personnelDTOList;
    private Integer pageSize;
    private Integer pageNumber;
    private Integer totalPages;
    private Integer totalElements;
    private String requestQueueName;
    private String responseQueueName;
}
