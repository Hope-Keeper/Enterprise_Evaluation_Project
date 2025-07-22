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
            return "health_manager";
        case "2":
            return "executive_manager";
        case "3":
            return "commission";
        case "4":
            return "evaluation_manager";
        case "5":
            return "evaluator";

        default:
            undefined;
    }
};
type userRolePersianTypes =
    | "کاربر"
    | "مدیر سلامت"
    | "مدیر اجرایی"
    | "کمیسیون"
    | "مدیر ارزشیابی"
    | "ارزیاب"
    | undefined;

export const userRolePersianConstructor: (
    userRoleNumber: string | undefined
) => userRolePersianTypes = (userRoleNumber) => {
    switch (userRoleNumber) {
        case "0":
            return "کاربر";
        case "1":
            return "مدیر سلامت";
        case "2":
            return "مدیر اجرایی";
        case "3":
            return "کمیسیون";
        case "4":
            return "مدیر ارزشیابی";
        case "5":
            return "ارزیاب";

        default:
            undefined;
    }
};
