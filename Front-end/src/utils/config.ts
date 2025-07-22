// any configuration to be used globaly in the app can store here (like defaultThemeType)
//"admin",✅
//"evaluator",
//"health-evaluator",
//"commission",
//"executive-director",
//"user"
export const userRole: string = localStorage.getItem("userRole") || "admin";
export const token: string | null = localStorage.getItem("userRole");
export const loginUrl = "/login/oauth2/code/keycloak";

// pages Routes
export const dashboard_Route: string = "/";
export const family_Route: string = "/family";
export const dimension_Route: string = "/family/dimension";
export const merit_Route: string = "/family/dimension/merit";
export const question_Route: string = "/family/dimension/merit/question";
export const unknownStatusStaff_Route: string = "/unknownStatus-staff";
export const unratedStaff_Route: string = "/unrated-staff";
export const evaluationProgram_Route: string = "/evaluation-program";
export const unitEvaluation_Route: string = "/unit-evaluation";
export const staffEvaluation_Route: string = "/staff-evaluation";
export const assessorRole_Route: string = "/assessor-rols";
export const evaluator_Route: string = "/evaluator";
export const evaluationQuestion_Route: string = "/evaluator-questions";
export const healthEvaluation_Route: string = "/health-evaluation";
export const executiveDirector_Route: string = "/executive-director";
export const commission_Route: string = "/commission";
export const commissionSummery_Route: string = "/commission-summery";
export const unitRecords_Route: string = "/evaluation-records";
export const user_Route: string = "/user";
//pagination
export const paginationSize: number = 10;

export function dataGenerator<T>(sample: T, length: number): T[] {
    const arr: T[] = [];
    for (let i = 0; i < length; i++) {
        arr.push(sample);
    }
    return arr;
}
