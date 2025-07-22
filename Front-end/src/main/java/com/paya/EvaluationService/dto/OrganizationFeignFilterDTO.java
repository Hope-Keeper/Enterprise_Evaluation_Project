package com.paya.EvaluationService.dto;

import lombok.*;
import lombok.experimental.FieldNameConstants;

import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldNameConstants
@Builder
public class OrganizationFeignFilterDTO {
    private UUID Id;

}
