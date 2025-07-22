import { createSlice } from "@reduxjs/toolkit";
import { DimensionSummeryType } from "types/api";
import { Option } from "types/components/autoCompleteHighlight";

const initState: ReduxCopyDimensionMeritsModalType = {
    isOpen: false,
    // MQ means: , Merits and Questions
    sourceDimension_MQS: null,
    sourceFamily: null,
    setSelectedRows: () => {}
};

export const CopyDimensionMeritsModal = createSlice({
    name: "CopyDimensionMeritsModal",
    initialState: initState,
    reducers: {
        openCopyDimensionMeritsModal: (
            state: ReduxCopyDimensionMeritsModalType,
            action: { payload: Omit<ReduxCopyDimensionMeritsModalType, "isOpen"> }
        ): void => {
            state.isOpen = true;
            state.sourceDimension_MQS = action.payload.sourceDimension_MQS;
            state.sourceFamily = action.payload.sourceFamily;
            state.setSelectedRows = action.payload.setSelectedRows;
        },
        closeCopyDimensionMeritsModal: (state: ReduxCopyDimensionMeritsModalType): void => {
            state.isOpen = false;
            state.sourceDimension_MQS = null;
            state.sourceFamily = null;
        }
    }
});

export const { openCopyDimensionMeritsModal, closeCopyDimensionMeritsModal } =
    CopyDimensionMeritsModal.actions;
export default CopyDimensionMeritsModal.reducer;

interface ReduxCopyDimensionMeritsModalType {
    isOpen: boolean;
    sourceFamily: Option | null;
    sourceDimension_MQS: DimensionSummeryType[] | null; //LIST OF DIMENSIONS SENT TO ANOTHER FAMILY
    setSelectedRows: () => void;
}
