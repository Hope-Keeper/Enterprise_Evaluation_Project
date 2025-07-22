package com.Reihan.EvaluationService.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnswerRepository extends MongoRepository<Answer, String> {
    List<Answer> findByEvaluatorId(String evaluatorId);
    List<Answer> findByEvaluateeId(String evaluateeId);
}
