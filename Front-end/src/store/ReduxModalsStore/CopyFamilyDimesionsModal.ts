import { createSlice } from "@reduxjs/toolkit";
import { FamilyType } from "types/api";

const initState: ReduxCopyFamilyDimesionsModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    sourceFamily_DMQ: null,
    getPage: () => {}
};

export const copyFamilyDimesionsModal = createSlice({
    name: "copyFamilyDimesionsModal",
    initialState: initState,
    reducers: {
        openCopyFamilyDimesionsModal: (
            state: ReduxCopyFamilyDimesionsModalType,
            action: {
                payload: Omit<ReduxCopyFamilyDimesionsModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.sourceFamily_DMQ = action.payload.sourceFamily_DMQ;
            state.getPage = action.payload.getPage;
        },
        closeCopyFamilyDimesionsModal: (state: ReduxCopyFamilyDimesionsModalType): void => {
            state.isOpen = false;
            state.sourceFamily_DMQ = null;
        }
    }
});

export const { openCopyFamilyDimesionsModal, closeCopyFamilyDimesionsModal } =
    copyFamilyDimesionsModal.actions;
export default copyFamilyDimesionsModal.reducer;

interface ReduxCopyFamilyDimesionsModalType {
    isOpen: boolean;
    sourceFamily_DMQ: FamilyType | null;
    getPage: () => void;
}
