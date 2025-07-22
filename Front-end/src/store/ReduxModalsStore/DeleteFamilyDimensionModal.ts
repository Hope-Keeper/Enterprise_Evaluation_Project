import { createSlice } from "@reduxjs/toolkit";
import { DimensionSummeryType } from "types/api";

const initState: ReduxDeleteFamilyDimensionModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_D: null,
    getPage: () => {}
};

export const DeleteFamilyDimensionModal = createSlice({
    name: "DeleteFamilyDimensionModal",
    initialState: initState,
    reducers: {
        openDeleteFamilyDimensionModal: (
            state: ReduxDeleteFamilyDimensionModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteFamilyDimensionModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_D = action.payload.source_D;
            state.getPage = action.payload.getPage;
        },
        closeDeleteFamilyDimensionModal: (state: ReduxDeleteFamilyDimensionModalType): void => {
            state.isOpen = false;
            state.source_D = null;
        }
    }
});

export const { openDeleteFamilyDimensionModal, closeDeleteFamilyDimensionModal } =
    DeleteFamilyDimensionModal.actions;
export default DeleteFamilyDimensionModal.reducer;

interface ReduxDeleteFamilyDimensionModalType {
    isOpen: boolean;
    source_D: DimensionSummeryType | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
