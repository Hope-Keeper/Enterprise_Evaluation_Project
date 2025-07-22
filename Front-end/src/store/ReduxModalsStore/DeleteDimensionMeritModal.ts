import { createSlice } from "@reduxjs/toolkit";
import { MeritSummeryType } from "types/api";

const initState: ReduxDeleteDimensionMeritModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_M: null,
    getPage: () => {}
};

export const DeleteDimensionMeritModal = createSlice({
    name: "DeleteDimensionMeritModal",
    initialState: initState,
    reducers: {
        openDeleteDimensionMeritModal: (
            state: ReduxDeleteDimensionMeritModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteDimensionMeritModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_M = action.payload.source_M;
            state.getPage = action.payload.getPage;
        },
        closeDeleteDimensionMeritModal: (state: ReduxDeleteDimensionMeritModalType): void => {
            state.isOpen = false;
            state.source_M = null;
        }
    }
});

export const { openDeleteDimensionMeritModal, closeDeleteDimensionMeritModal } =
    DeleteDimensionMeritModal.actions;
export default DeleteDimensionMeritModal.reducer;

interface ReduxDeleteDimensionMeritModalType {
    isOpen: boolean;
    source_M: MeritSummeryType | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
