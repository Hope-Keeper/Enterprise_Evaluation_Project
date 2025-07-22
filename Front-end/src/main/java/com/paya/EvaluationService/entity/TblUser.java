package com.Reihan.EvaluationService.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tbl_user")
@Data
@NoArgsConstructor
public class TblUser {

    @Id
    @Column(name = "user_id", length = 32)
    private String uuid;

    @PrePersist
    public void generateId() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString();
        }
    }

    @Column(name = "username", unique = true, length = 5)
    private String username;

    @Transient
    private PersonnelDTO userInfo;

    @Transient
    private Set<String> roles;

    @Column(name = "user_role")
    private String currentRole;
    @Transient
    private LocalDate currentDate;
    @Transient
    private Boolean isNotificationToPersonnelRequired;
}
