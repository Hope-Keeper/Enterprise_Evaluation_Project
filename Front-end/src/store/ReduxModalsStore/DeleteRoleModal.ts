import { createSlice } from "@reduxjs/toolkit";
import { RoleType } from "api/Role";

const initState: ReduxDeleteRoleModalType = {
    isOpen: false,
    // DMQ means: Dimensions, Merits and Questions
    source_Role: null,
    roles: [],
    setRoles: () => {}
};

export const DeleteRoleModal = createSlice({
    name: "DeleteRoleModal",
    initialState: initState,
    reducers: {
        openDeleteRoleModal: (
            state: ReduxDeleteRoleModalType,
            action: {
                type: string;
                payload: Omit<ReduxDeleteRoleModalType, "isOpen">;
            }
        ): void => {
            state.isOpen = true;
            state.source_Role = action.payload.source_Role;
            state.roles = action.payload.roles;
            state.setRoles = action.payload.setRoles;
        },
        closeDeleteRoleModal: (state: ReduxDeleteRoleModalType): void => {
            state.isOpen = false;
            state.source_Role = null;
            state.roles = null;
        }
    }
});

export const { openDeleteRoleModal, closeDeleteRoleModal } = DeleteRoleModal.actions;
export default DeleteRoleModal.reducer;

interface ReduxDeleteRoleModalType {
    isOpen: boolean;
    source_Role: RoleType | null;
    roles: RoleType[] | null;
    setRoles: (newDimension: RoleType[]) => void;
}
