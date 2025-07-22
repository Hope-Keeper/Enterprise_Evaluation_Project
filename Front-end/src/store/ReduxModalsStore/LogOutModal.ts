import { createSlice } from "@reduxjs/toolkit";

const initState: ReduxLogOutModalType = {
    isOpen: false
    // DMQ means: Dimensions, Merits and Qsuestions
};

export const LogOutModal = createSlice({
    name: "LogOutModal",
    initialState: initState,
    reducers: {
        openLogOutModal: (state: ReduxLogOutModalType): void => {
            state.isOpen = true;
        },
        closeLogOutModal: (state: ReduxLogOutModalType): void => {
            state.isOpen = false;
        }
    }
});

export const { openLogOutModal, closeLogOutModal } = LogOutModal.actions;
export default LogOutModal.reducer;

interface ReduxLogOutModalType {
    isOpen: boolean;
}
