import { createSlice } from "@reduxjs/toolkit";
import { MeritSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";

const initState: ReduxCopyMeritsQuestionsModalType = {
    isOpen: false,
    source: null,
    setSelectedRows: () => {}
};

export const CopyMeritsQuestionsModal = createSlice({
    name: "CopyMeritsQuestionsModal",
    initialState: initState,
    reducers: {
        openCopyMeritsQuestionsModal: (
            state: ReduxCopyMeritsQuestionsModalType,
            action: { payload: Omit<ReduxCopyMeritsQuestionsModalType, "isOpen"> }
        ): void => {
            state.isOpen = true;
            state.source = action.payload.source;
            state.setSelectedRows = action.payload.setSelectedRows;
        },
        closeCopyMeritsQuestionsModal: (state: ReduxCopyMeritsQuestionsModalType): void => {
            state.isOpen = false;
            state.source = null;
        }
    }
});

export const { openCopyMeritsQuestionsModal, closeCopyMeritsQuestionsModal } =
    CopyMeritsQuestionsModal.actions;
export default CopyMeritsQuestionsModal.reducer;

interface ReduxCopyMeritsQuestionsModalType {
    isOpen: boolean;
    source: {
        family: Option | null;
        dimension: Option | null;
        merits: MeritSummeryType[] | null;
    } | null;
    setSelectedRows: () => void;
}
