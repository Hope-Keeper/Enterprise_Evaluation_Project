import { createSlice } from "@reduxjs/toolkit";
import { PersonnelType } from "api/Staff";

const initState: CurrentUserType | null = {
    perssonaelInfo: null
};

export const CurrentUser = createSlice({
    name: "currentUser",
    initialState: initState,
    reducers: {
        setCurrentUserPersonnelInfoObject: (state: CurrentUserType, actions): void => {
            state.perssonaelInfo = actions.payload;
        }
    }
});

export const { setCurrentUserPersonnelInfoObject } = CurrentUser.actions;

export default CurrentUser.reducer;

export interface CurrentUserType {
    perssonaelInfo: {
        uuid: string;
        username: string;
        userInfo: PersonnelType;
        roles: string[];
        currentRole: string;
    } | null;
}
