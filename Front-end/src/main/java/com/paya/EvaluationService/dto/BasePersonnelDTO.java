package com.Reihan.EvaluationService.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Data
@SuperBuilder
@FieldNameConstants
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,  // Use type name for polymorphism
        include = JsonTypeInfo.As.PROPERTY,  // Include type info as a property in the JSON
        property = "type",  // The property name in JSON for type information
        visible = true  // Ensure "type" is visible during deserialization
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = PersonnelDTO.class, name = "personnel"),
        @JsonSubTypes.Type(value = BasePersonnelDTO.class, name = "basePersonnel")
})
public class BasePersonnelDTO {
    private String personnelId;
    private String personnelFirstName;
    private String personnelLastName;
    private String personnelOrganizationID;
    private String personnelNationalCode;
    private Integer personnelAge;
    //    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<String> personnelIdList;
    private List<String> personnelOrganizationIdList;
    private List<String> personnelUnitCodeList;
    private List<String> personnelRankCodeList;
    private String personnelServiceUnit;
    private String consumerName;
    @Value("${evaluation.typeOfPersonnelDTOWithManagerSending}")
    private String typeOfPersonnelDTOWithManagerSending;

    private String type = typeOfPersonnelDTOWithManagerSending;
}