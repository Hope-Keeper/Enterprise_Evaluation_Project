import { createSlice } from "@reduxjs/toolkit";
import { QuestionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";

const initState: ReduxCopyQuestionModalType = {
    isOpen: false,
    // DMQ means: Questions
    source: null,
    setSelectedRows: () => {}
};

export const CopyQuestionModal = createSlice({
    name: "CopyQuestionModal",
    initialState: initState,
    reducers: {
        openCopyQuestionModal: (
            state: ReduxCopyQuestionModalType,
            action: { payload: Omit<ReduxCopyQuestionModalType, "isOpen"> }
        ): void => {
            state.isOpen = true;
            state.source = action.payload.source;
            state.setSelectedRows = action.payload.setSelectedRows;
        },
        closeCopyQuestionModal: (state: ReduxCopyQuestionModalType): void => {
            state.isOpen = false;
            state.source = null;
        }
    }
});

export const { openCopyQuestionModal, closeCopyQuestionModal } = CopyQuestionModal.actions;
export default CopyQuestionModal.reducer;

interface ReduxCopyQuestionModalType {
    isOpen: boolean;
    source: {
        family: Option | null;
        dimension: Option | null;
        merit: Option | null;
        questions: QuestionSummeryType[] | null;
    } | null;
    setSelectedRows: () => void;
}
