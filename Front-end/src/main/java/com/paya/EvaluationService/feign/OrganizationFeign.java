package com.Reihan.EvaluationService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.concurrent.ExecutionException;

@FeignClient(name = "MAIN ORGANIZATION", url = "http://example")
public interface OrganizationFeign {

    @PostMapping("/api/organizationFeigns/")
    List<OrganizationFeignFilterDTO> getAllOrganizationFeign( @RequestParam Integer pageNumber, @RequestParam Integer pageSize) throws ExecutionException, InterruptedException;
}
