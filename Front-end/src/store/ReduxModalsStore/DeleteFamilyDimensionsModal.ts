import { createSlice } from "@reduxjs/toolkit";
import { DimensionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";

const initState: ReduxDeleteFamilyDimensionsModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_family: null,
    source_Ds: null,
    getPage: () => {}
};

export const DeleteFamilyDimensionsModal = createSlice({
    name: "DeleteFamilyDimensionsModal",
    initialState: initState,
    reducers: {
        openDeleteFamilyDimensionsModal: (
            state: ReduxDeleteFamilyDimensionsModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteFamilyDimensionsModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_family = action.payload.source_family;
            state.source_Ds = action.payload.source_Ds;
            state.getPage = action.payload.getPage;
        },
        closeDeleteFamilyDimensionsModal: (state: ReduxDeleteFamilyDimensionsModalType): void => {
            state.isOpen = false;
            state.source_Ds = null;
        }
    }
});

export const { openDeleteFamilyDimensionsModal, closeDeleteFamilyDimensionsModal } =
    DeleteFamilyDimensionsModal.actions;
export default DeleteFamilyDimensionsModal.reducer;

interface ReduxDeleteFamilyDimensionsModalType {
    isOpen: boolean;
    source_family: Option | null;
    source_Ds: DimensionSummeryType[] | null;
    getPage: (mode: "delete" | "usual", pageAllMembers1?: number, rowsPerPage1?: number) => void;
}
