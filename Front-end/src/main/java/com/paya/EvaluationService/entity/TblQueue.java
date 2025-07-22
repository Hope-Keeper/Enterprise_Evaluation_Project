package com.paya.EvaluationService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Entity
@Table(name = "tbl_queue")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TblQueue {


    @Id
    @Column(name = "queue_id")
    private String queueId;

    @PrePersist
    private void id() {
        if (queueId == null) {
            this.queueId = UUID.randomUUID().toString();
        }
    }

    private String requestQueueName;

    private String responseQueueName;
}
