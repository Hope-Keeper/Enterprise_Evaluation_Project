package com.Reihan.EvaluationService.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ORGANIZATION-STRUCTURE-SERVICE", url = "http://10.16.113.33:8078" )
public interface RankLevelDataFeignClient {

    @GetMapping("/api/v1/organizationStructure/getAllRankWithCivilian/")
    List<RankLevelDataDTO> getAllRankWithCivilian();


    @GetMapping("/api/v1/organizationStructure/getAllJobLevelWithJobGroup/")
   List<JobLevelWithJobGroupDataDTO> getAllJobLevelWithJobGroup();

    @GetMapping("/api/v1/organizationStructure/rankLevelData/")
    ResponseEntity<List<RankLevelDataDTO>> getRankLevelDataWithoutParams();


    @GetMapping("/api/v1/organizationStructure/rankLevelData/")
    ResponseEntity<List<RankLevelDataDTO>> getRankLevelData();

    @GetMapping("jobGroupJobPosition")
    ResponseEntity<List<String>> getJobGroupJobPosition(@RequestParam(name = "jobGroup", required = false) String jobGroup,
                                                        @RequestParam(value = "jobPosition", required = false) String jobPosition);


    @GetMapping
    ResponseEntity<List<String>> getDegreeRank(@RequestParam(name = "degree", required = false) String degree,
                                               @RequestParam(value = "rank", required = false) String rank);

}
