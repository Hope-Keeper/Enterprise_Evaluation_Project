import withMainContainer from "@share/layout/withMainContainer";
import { userRoleConstructor } from "helper";
import { useSelector } from "react-redux";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import { RootState } from "store";
import { RouteCreatorPropsType } from "types/layout/container";
import AssessorRoles from "./AssessorRoles";
import AssignQuestionToRole from "./AssignQuestionsToRole";
import Commission from "./Commission";
import CommissionSummery from "./CommissionSummary";
import ConfirmUnratedStaff from "./ConfirmUnratedStaff";
import DimensionView from "./DimensionView";
import DimensionsPage from "./Dimentions";
import EmployeeEvaluation from "./EmployeeEvaluation";
import EvaluationProgram from "./EvaluationProgram";
import EvaluatorQuestions from "./EvaluationQuestions";
import Evaluator from "./Evaluator";
import ExecutiveDirector from "./ExecutiveDirector";
import FamiliesPage from "./Families";
import FamiliesView from "./FamiliesView";
import HealthEvaluation from "./HealthEvaluetion";
import KeycloackLoginPage from "./Login";
import MeritsPage from "./Merits";
import MeritView from "./MeritView";
import QuestionsPage from "./Questions";
import StaffEvaluation from "./StaffEvaluation";
import UnitEvaluation from "./UnitEvaluation";
import UnitEvaluationRecords from "./UnitEvaluationRecords";
import UnknownStatusStaff from "./UnknownStatusStaff";
import UnratedStaff from "./UnratedStaff";
import UserPanel from "./User";
import UserPanelDiagram from "./User/EvaluationRecordDiagrams";
import Dashboard from "./Dashboard";

const routeCreator = ({ userHasAccess, path, component }: RouteCreatorPropsType) => {
    if (userHasAccess) return <Route key={path} path={path} element={component} />;

    return (
        <Route
            key={path}
            path={path}
            element={
                <>
                    <Dashboard />
                </>
            }
        />
    );
};

function RouteManager() {
    const currentUser = useSelector((state: RootState) => state.currentUser.perssonaelInfo);
    const currentUserRole = userRoleConstructor(currentUser?.currentRole);

    return (
        <ReactRoutes>
            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/",
                component: <Dashboard />
            })}

            {routeCreator({
                userHasAccess: true,
                path: "/login/oauth2/code/keycloak",
                component: <KeycloackLoginPage />
            })}

            {/**مدیر ارزشیابی =  4 */}
            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family",
                component: <FamiliesPage />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/:id/all-views",
                component: <FamiliesView />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/dimension",
                component: <DimensionsPage />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/:id/dimension/:id/all-views",
                component: <DimensionView />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/dimension/merit",
                component: <MeritsPage />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/:id/dimension/:id/merit/:id/all-views",
                component: <MeritView />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/family/dimension/merit/question",
                component: <QuestionsPage />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/evaluation-program",
                component: <EvaluationProgram />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/assessor-rols",
                component: <AssessorRoles />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/assessor-rols/:id/assignQuestionToRole",
                component: <AssignQuestionToRole />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/unknownStatus-staff",
                component: <UnknownStatusStaff />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/unit-evaluation",
                component: <UnitEvaluation />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/staff-evaluation",
                component: <StaffEvaluation />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/employee-evaluation",
                component: <EmployeeEvaluation />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "/unrated-staff",
                component: <UnratedStaff />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "evaluation_manager",
                path: "confirm-unrated-staff",
                component: <ConfirmUnratedStaff />
            })}

            {/**مدیر یگان /کمیسیون = 3 */}
            {routeCreator({
                userHasAccess: currentUserRole === "commission",
                path: "/commission",
                component: <Commission />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "commission",
                path: "/commission-summery",
                component: <CommissionSummery />
            })}

            {/**مدیر سلامت = 1  */}
            {routeCreator({
                userHasAccess: currentUserRole === "health_manager",
                path: "/health-evaluation",
                component: <HealthEvaluation />
            })}

            {/**ارزیاب =  5  */}
            {routeCreator({
                userHasAccess: currentUserRole === "evaluator",
                //evaluator
                path: "/evaluator",
                component: <Evaluator />
            })}

            {routeCreator({
                //evaluator
                userHasAccess: currentUserRole === "evaluator",

                path: "/evaluator-questions",
                component: <EvaluatorQuestions />
            })}

            {/**کاربر = 0 */}
            {routeCreator({
                userHasAccess: currentUserRole === "personnel",

                path: "/user",
                component: <UserPanel />
            })}

            {routeCreator({
                userHasAccess: currentUserRole === "personnel",

                path: "/user/user-diagram",
                component: <UserPanelDiagram />
            })}

            {/**مدیر اجرایی =2  */}

            {routeCreator({
                userHasAccess: currentUserRole === "executive_manager",

                path: "/executive-director",
                component: <ExecutiveDirector />
            })}

            {routeCreator({
                userHasAccess:
                    currentUserRole === "evaluation_manager" ||
                    currentUserRole === "health_manager" ||
                    currentUserRole === "commission" ||
                    currentUserRole === "executive_manager",
                path: "/evaluation-records",
                component: <UnitEvaluationRecords />
            })}

            <Route path="*" element={<h1>404</h1>} />
        </ReactRoutes>
    );
}

export default withMainContainer(RouteManager);
