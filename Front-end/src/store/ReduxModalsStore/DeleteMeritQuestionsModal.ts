import { createSlice } from "@reduxjs/toolkit";
import { QuestionSummeryType } from "types/api";

const initState: ReduxDeleteMeritQuestionsModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_Qs: null,
    getPage: () => {}
};

export const DeleteMeritQuestionsModal = createSlice({
    name: "DeleteMeritQuestionsModal",
    initialState: initState,
    reducers: {
        openDeleteMeritQuestionsModal: (
            state: ReduxDeleteMeritQuestionsModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteMeritQuestionsModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_Qs = action.payload.source_Qs;
            state.getPage = action.payload.getPage;
        },
        closeDeleteMeritQuestionsModal: (state: ReduxDeleteMeritQuestionsModalType): void => {
            state.isOpen = false;
            state.source_Qs = null;
        }
    }
});

export const { openDeleteMeritQuestionsModal, closeDeleteMeritQuestionsModal } =
    DeleteMeritQuestionsModal.actions;
export default DeleteMeritQuestionsModal.reducer;

interface ReduxDeleteMeritQuestionsModalType {
    isOpen: boolean;
    source_Qs: QuestionSummeryType[] | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
