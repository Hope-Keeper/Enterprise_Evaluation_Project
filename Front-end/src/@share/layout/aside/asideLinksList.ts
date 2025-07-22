import {
    ClipBoardQuestionIcon,
    DashboardIcon,
    EvaluationRecordsIcon,
    IdCartIcon,
    PersonsIcon
} from "@share/icons";
import { AwardIcon } from "@share/icons/Award";
import { CubsIcon } from "@share/icons/Cubs";
import { JobsIcon } from "@share/icons/jobs";
import { ListIcon } from "@share/icons/List";
import { PersonSearchIcon } from "@share/icons/PersonSerach";
import { UnitIcon } from "@share/icons/Unit";
import {
    assessorRole_Route,
    commission_Route,
    dashboard_Route,
    dimension_Route,
    evaluationProgram_Route,
    evaluator_Route,
    executiveDirector_Route,
    family_Route,
    healthEvaluation_Route,
    merit_Route,
    question_Route,
    staffEvaluation_Route,
    unitEvaluation_Route,
    unitRecords_Route,
    unknownStatusStaff_Route,
    user_Route
} from "utils/config";
// // Function to set level and ID based on depth
// const setLevelsAndIds = (
//     items: NestedListPropsType[],
//     currentLevel: number = 1,
//     parentId: string = ""
// ): NestedListPropsType[] => {
//     return items.map((item, index) => {
//         const id = parentId ? `${parentId}_${index}` : `${index}`;
//         const updatedItem = {
//             ...item,
//             level: currentLevel,
//             id
//         };
//         if (item.children) {
//             updatedItem.children = setLevelsAndIds(item.children, currentLevel + 1, id);
//         }
//         return updatedItem;
//     });
// };

// // Initial asideLinksList without hardcoded level and id keys
// const asideLinksList: NestedListPropsType[] = setLevelsAndIds([
//     {
//         link: dashboard_Route,
//         title: "داشبورد",
//         icon: DashboardIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: family_Route,
//         title: "لیست خانواده های شغلی",
//         icon: JobsIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: dimension_Route,
//         title: "لیست بعد ها",
//         icon: CubsIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: merit_Route,
//         title: "لیست  شایستگی ها",
//         icon: AwardIcon,
//         validRoles: ["admin"]
//     },

//     {
//         link: question_Route,
//         title: "لیست سنجه ها",
//         icon: ClipBoardQuestionIcon,
//         validRoles: ["admin"]
//     },

//     {
//         link: evaluationProgram_Route,
//         title: "لیست دوره ها",
//         icon: ListIcon,
//         validRoles: ["admin"]
//     },
//     // {
//     //     link: evaluator_Route,
//     //     title: "نقش های ارزیاب",
//     //     icon: IdCartIcon,
//     //     validRoles: ["admin"]
//     // },
//     {
//         link: assessorRole_Route,
//         title: "نقش های ارزیاب",
//         icon: AssignQuestionIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: unknownStatusStaff_Route,
//         title: "کارکنان با وضعیت عدم شناخت ",
//         icon: PersonsIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: unitEvaluation_Route,
//         title: "وضعیت ارزشیابی یگان ها",
//         icon: UnitIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: staffEvaluation_Route,
//         title: "وضعیت ارزشیابی کارکنان",
//         icon: PersonSearchIcon,
//         validRoles: ["admin"]
//     },
//     {
//         link: evaluator_Route,
//         title: "لیست ارزیابی شوندگان",
//         icon: PersonsIcon,
//         validRoles: ["evaluator"]
//     },
//     {
//         link: evaluationQuestion_Route,
//         title: "سوالات ارزشیابی",
//         icon: ClipBoardQuestionIcon,
//         validRoles: ["evaluator"]
//     },

//     {
//         link: healthEvaluation_Route,
//         title: "ارزشیابی سلامت دوره جاری",
//         icon: ListIcon,
//         validRoles: ["health-evaluator"]
//     },
//     // {
//     //     link: "#",
//     //     title: "کلیه ارزشیابی های دوره جاری",
//     //     icon: FileIcon,
//     //     validRoles: ["health-evaluator"]
//     // },

//     {
//         link: commission_Route,
//         title: "وضعیت ارزشیابی کارکنان",
//         icon: PersonSearchIcon,
//         validRoles: ["commission"]
//     },
//     // {
//     //     link: commissionSummery_Route,
//     //     title: "ثبت مصوبه کمسیون ارزشیابی",
//     //     icon: PersonListIcon,
//     //     validRoles: ["commission"]
//     // },

//     {
//         link: executiveDirector_Route,
//         title: " بررسی وضعیت ارزیابی ها",
//         icon: PersonSearchIcon,
//         validRoles: ["executive-director"]
//     },
//     {
//         link: unitRecords_Route,
//         title: "سوابق ارزشیابی",
//         icon: EvaluationRecordsIcon,
//         validRoles: ["admin", "evaluator", "health-evaluator", "commission", "executive-director"]
//     },
//     {
//         link: user_Route,
//         title: "سوابق ارزشیابی",
//         icon: RecordsIcon,
//         validRoles: ["user"]
//     }
// ]);

// export default asideLinksList;
import { useSelector } from "react-redux";
import { RootState } from "store";
import { NestedListPropsType } from "types/components/nestedList";
import { userRoleConstructor } from "helper";

// Function to set level and ID based on depth
const setLevelsAndIds = (
    items: NestedListPropsType[],
    currentLevel: number = 1,
    parentId: string = ""
): NestedListPropsType[] => {
    return items.map((item, index) => {
        const id = parentId ? `${parentId}_${index}` : `${index}`;
        const updatedItem = {
            ...item,
            level: currentLevel,
            id
        };
        if (item.children) {
            updatedItem.children = setLevelsAndIds(item.children, currentLevel + 1, id);
        }
        return updatedItem;
    });
};

// Function to generate the aside links list
export const GetAsideLinksList = (): NestedListPropsType[] => {
    const currentUser = useSelector((state: RootState) => state.currentUser.perssonaelInfo);
    const currentUserRole = userRoleConstructor(currentUser?.currentRole);

    return setLevelsAndIds([
        //////////////////////مدیر ارزشیابی//////////
        {
            link: dashboard_Route,
            title: "داشبورد",
            icon: DashboardIcon,
            userHasAccess:
                currentUserRole === "evaluation_manager" ||
                currentUserRole === "evaluator" ||
                currentUserRole === "health_manager" ||
                currentUserRole === "commission" ||
                currentUserRole === "executive_manager" ||
                currentUserRole === "personnel"
        },
        {
            link: family_Route,
            title: "لیست خانواده های شغلی",
            icon: JobsIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: dimension_Route,
            title: "لیست بعد ها",
            icon: CubsIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: merit_Route,
            title: "لیست  شایستگی ها",
            icon: AwardIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: question_Route,
            title: "لیست سنجه ها",
            icon: ClipBoardQuestionIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: evaluationProgram_Route,
            title: "لیست دوره ها",
            icon: ListIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: assessorRole_Route,
            title: "نقش های ارزیاب",
            icon: IdCartIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: unknownStatusStaff_Route,
            title: "کارکنان با وضعیت عدم شناخت ",
            icon: PersonsIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: unitEvaluation_Route,
            title: "وضعیت ارزشیابی یگان ها",
            icon: UnitIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        {
            link: staffEvaluation_Route,
            title: "وضعیت ارزشیابی کارکنان",
            icon: PersonSearchIcon,
            userHasAccess: currentUserRole === "evaluation_manager"
        },
        ///////////////////////////// ارزیاب///////////
        {
            link: evaluator_Route,
            title: "لیست ارزیابی شوندگان",
            icon: PersonsIcon,
            userHasAccess: currentUserRole === "evaluator" //evaluator
        },

        ///////////////////سلامت////////////////////////
        {
            link: healthEvaluation_Route,
            title: "ارزشیابی سلامت دوره جاری",
            icon: ListIcon,
            userHasAccess: currentUserRole === "health_manager" //health_evaluator
        },
        ///////////////////////کمیسیون//////////////////
        {
            link: commission_Route,
            title: "وضعیت ارزشیابی کارکنان",
            icon: PersonSearchIcon,
            userHasAccess: currentUserRole === "commission" //commission
        },
        ////////////////////مدیر اجرایی//////////////////
        {
            link: executiveDirector_Route,
            title: " بررسی وضعیت ارزیابی ها",
            icon: PersonSearchIcon,
            userHasAccess: currentUserRole === "executive_manager" //executive-director
        },
        /////////////////سوابق یگان /////////////////////

        {
            link: unitRecords_Route,
            title: "سوابق ارزشیابی",
            icon: EvaluationRecordsIcon,
            userHasAccess:
                currentUserRole === "evaluation_manager" ||
                currentUserRole === "health_manager" ||
                currentUserRole === "commission" ||
                currentUserRole === "executive_manager"
        },
        //////////////////سوابق فرد///////////////////////

        {
            link: user_Route,
            title: "سوابق ارزشیابی",
            icon: EvaluationRecordsIcon,
            userHasAccess: currentUserRole === "personnel"
        }
    ]);
};
//

//     {
//         link: unknownStatusStaff_Route,
//         title: "کارکنان با وضعیت عدم شناخت ",
//         icon: PersonsIcon,
//         validRoles[0]: ["admin"]
//     },
//     {
//         link: unitEvaluation_Route,
//         title: "وضعیت ارزشیابی یگان ها",
//         icon: UnitIcon,
//         validRoles[0]: ["admin"]
//     },
//     {
//         link: staffEvaluation_Route,
//         title: "وضعیت ارزشیابی کارکنان",
//         icon: PersonSearchIcon,
//         validRoles[0]: ["admin"]
//     },

//     {
//         link: commission_Route,
//         title: "وضعیت ارزشیابی کارکنان",
//         icon: PersonSearchIcon,
//         validRoles[0]: ["commission"]
//     },
//     // {
//     //     link: commissionSummery_Route,
//     //     title: "ثبت مصوبه کمسیون ارزشیابی",
//     //     icon: PersonListIcon,
//     //     validRoles[0]: ["commission"]
//     // },

//     {
//         link: executiveDirector_Route,
//         title: " بررسی وضعیت ارزیابی ها",
//         icon: PersonSearchIcon,
//         validRoles[0]: ["executive-director"]
//     },
//     {
//         link: unitRecords_Route,
//         title: "سوابق ارزشیابی",
//         icon: EvaluationRecordsIcon,
//         validRoles[0]: ["admin", "evaluator", "health-evaluator", "commission", "executive-director"]
//     },

//     {
//         link: user_Route,
//         title: "سوابق ارزشیابی",
//         icon: RecordsIcon,
//         validRoles[0]: ["user"]
//     }
// ]);
