package com.paya.EvaluationService.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/personnel")
@RequiredArgsConstructor
public class PersonnelController {
    private final PersonnelService personnelService;

    @Value("${punishment.typeOfPersonnelDTOSending}")
    private String typeOfPersonnelDTOSending;

    @GetMapping("/{personnelOrganizationID}")
    public ResponseEntity<PersonnelDTO> getAllPersonnelByPersonnelOrganizationID(@PathVariable String personnelOrganizationID) throws Exception {
        PersonnelDTO personnel = personnelService.findByOrganizationId(personnelOrganizationID, typeOfPersonnelDTOSending);

            return ResponseEntity.ok().body(personnel);



    }


}
