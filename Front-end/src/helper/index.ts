type userRoleTypes =
    | "personnel"
    | "health_manager"
    | "executive_manager"
    | "commission"
    | "evaluation_manager"
    | "evaluator"
    | undefined;
export const userRoleConstructor: (userRoleNumber: string | undefined) => userRoleTypes = (
    userRoleNumber
) => {
    switch (userRoleNumber) {
        case "0":
            return "personnel";
        case "1":
            return "manager";

        case "3":
            return "evaluator";

        default:
            undefined;
    }
};
type userRolePersianTypes = "کاربر" | "مدیر " | "ارزیاب" | undefined;

export const userRolePersianConstructor: (
    userRoleNumber: string | undefined
) => userRolePersianTypes = (userRoleNumber) => {
    switch (userRoleNumber) {
        case "0":
            return "personnel";
        case "1":
            return "manager";

        case "3":
            return "evaluator";

        default:
            undefined;
    }
};
