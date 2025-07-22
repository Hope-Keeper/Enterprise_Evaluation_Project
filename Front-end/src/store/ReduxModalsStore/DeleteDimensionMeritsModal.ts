import { createSlice } from "@reduxjs/toolkit";
import { MeritSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";
const initState: ReduxDeleteDimensionMeritsModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_Ms: null,
    getPage: () => {}
};

export const DeleteDimensionMeritsModal = createSlice({
    name: "DeleteDimensionMeritsModal",
    initialState: initState,
    reducers: {
        openDeleteDimensionMeritsModal: (
            state: ReduxDeleteDimensionMeritsModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteDimensionMeritsModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_Ms = action.payload.source_Ms;
            state.getPage = action.payload.getPage;
        },
        closeDeleteDimensionMeritsModal: (state: ReduxDeleteDimensionMeritsModalType): void => {
            state.isOpen = false;
            state.source_Ms = null;
        }
    }
});

export const { openDeleteDimensionMeritsModal, closeDeleteDimensionMeritsModal } =
    DeleteDimensionMeritsModal.actions;
export default DeleteDimensionMeritsModal.reducer;

interface ReduxDeleteDimensionMeritsModalType {
    isOpen: boolean;
    source_FamililyDimension?: { family: Option | null; dimension: Option | null };
    source_Ms: MeritSummeryType[] | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
