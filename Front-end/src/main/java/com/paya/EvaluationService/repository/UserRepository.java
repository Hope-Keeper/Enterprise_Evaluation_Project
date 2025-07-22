package com.Reihan.EvaluationService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<TblUser, String> {
    TblUser findByUsername(String username);

    boolean existsByUuid(String uuid);
}

