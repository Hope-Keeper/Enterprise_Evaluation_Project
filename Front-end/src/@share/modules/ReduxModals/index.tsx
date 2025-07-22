import CopyDimensionMeritsModalDialog from "./CopyDimensionMerits";
import CopyFamilyDimensionsModalDialog from "./CopyFamilyDimensions";
import CopyMeritsQuestionsModalDialog from "./CopyMeritQuestions";
import CopyQuestionModalDialog from "./CopyQuestion";
import DeleteDimensionMeritModalDialog from "./Delete/DeleteDimensionMerit";
import DeleteDimensionMeritsModalDialog from "./Delete/DeleteDimensionMerits";
import DeleteFamilyDimensionModalDialog from "./Delete/DeleteFamilyDimension";
import DeleteFamilyDimensionsModalDialog from "./Delete/DeleteFamilyDimesions";
import DeleteMeritQuestionModalDialog from "./Delete/DeleteMeritQestion";
import DeleteMeritQuestionsModalDialog from "./Delete/DeleteMeritQuestions";
import DeleteRoleModalDialog from "./Delete/DeleteRole";
import LogOutModalDialog from "./LogOut";

function ReduxModals() {
    return (
        <>
            <CopyFamilyDimensionsModalDialog />
            <CopyDimensionMeritsModalDialog />
            <CopyMeritsQuestionsModalDialog />
            <CopyQuestionModalDialog />
            <DeleteFamilyDimensionModalDialog />
            <DeleteDimensionMeritModalDialog />
            <DeleteMeritQuestionModalDialog />
            <DeleteDimensionMeritsModalDialog />
            <DeleteMeritQuestionsModalDialog />
            <DeleteFamilyDimensionsModalDialog />
            <DeleteRoleModalDialog />
            <LogOutModalDialog />
        </>
    );
}

export default ReduxModals;
