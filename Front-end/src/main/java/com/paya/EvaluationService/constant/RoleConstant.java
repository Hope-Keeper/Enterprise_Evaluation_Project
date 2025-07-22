package com.paya.EvaluationService.constant;

import org.springframework.stereotype.Component;

@Component
public class RoleConstant {
    public enum ROLE {
        Admin("0", "admin"),
        Evaluator("1", "evaluator");

        private final String value;
        private final String keyName;

        ROLE(String value, String keyName) {
            this.value = value;
            this.keyName = keyName;
        }

        public String getValue() {
            return value;
        }

        public String getKeyName(){
            return keyName;
        }

        public static ROLE fromValue(String value) {
            for (ROLE role : ROLE.values()) {
                if (role.getValue().equals(value)) {
                    return role;
                }
            }
            return null;
        }

        public static ROLE fromKeyName(String keyName) {
            for (ROLE role : ROLE.values()) {
                if (role.getKeyName().equals(keyName)) {
                    return role;
                }
            }
            return null;
        }

    }
}