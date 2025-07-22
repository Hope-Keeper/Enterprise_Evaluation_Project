package com.Reihan.EvaluationService.constant;

public enum RoleServiceConstant {

    Admin("0", "admin"),
    Evaluator("1", "evaluator");

    private final String value;
    private final String keyName;

    RoleServiceConstant(String value, String keyName) {
        this.value = value;
        this.keyName = keyName;
    }

    public String getValue() {
        return value;
    }

    public String getKeyName(){
        return keyName;
    }

    public static RoleServiceConstant fromValue(String value) {
        for (RoleServiceConstant role : RoleServiceConstant.values()) {
            if (role.getValue().equals(value)) {
                return role;
            }
        }
        return null;
    }

    public static RoleServiceConstant fromKeyName(String keyName) {
        for (RoleServiceConstant role : RoleServiceConstant.values()) {
            if (role.getKeyName().equals(keyName)) {
                return role;
            }
        }
        return null;
    }

}