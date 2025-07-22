import { createSlice } from "@reduxjs/toolkit";
import { QuestionSummeryType } from "types/api";

const initState: ReduxDeleteMeritQuestionModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_Q: null,
    getPage: () => {}
};

export const DeleteMeritQuestionModal = createSlice({
    name: "DeleteMeritQuestionModal",
    initialState: initState,
    reducers: {
        openDeleteMeritQuestionModal: (
            state: ReduxDeleteMeritQuestionModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteMeritQuestionModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_Q = action.payload.source_Q;
            state.getPage = action.payload.getPage;
        },
        closeDeleteMeritQuestionModal: (state: ReduxDeleteMeritQuestionModalType): void => {
            state.isOpen = false;
            state.source_Q = null;
        }
    }
});

export const { openDeleteMeritQuestionModal, closeDeleteMeritQuestionModal } =
    DeleteMeritQuestionModal.actions;
export default DeleteMeritQuestionModal.reducer;

interface ReduxDeleteMeritQuestionModalType {
    isOpen: boolean;
    source_Q: QuestionSummeryType | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
