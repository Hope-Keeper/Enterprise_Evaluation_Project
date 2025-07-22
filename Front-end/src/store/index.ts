// starter file for any State Management such as redux

import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser";
import layoutReducer from "./layout";
import CopyDimesionMeritsModalReducer from "./ReduxModalsStore/CopyDimensionMeritsModal";
import copyFamilyDimesionsModalReducer from "./ReduxModalsStore/CopyFamilyDimesionsModal";
import CopyMeritQuestionsModalReducer from "./ReduxModalsStore/CopyMeritQuestionsModal";
import CopyQuestionModalReducer from "./ReduxModalsStore/CopyQuestionModal";
import DeleteDimensionMeritModalReducer from "./ReduxModalsStore/DeleteDimensionMeritModal";
import DeleteDimensionMeritsModalReducer from "./ReduxModalsStore/DeleteDimensionMeritsModal";
import DeleteFamilyDimesionModalReducer from "./ReduxModalsStore/DeleteFamilyDimensionModal";
import DeleteFamilyDimesionsModalReducer from "./ReduxModalsStore/DeleteFamilyDimensionsModal";
import DeleteMeritQuestionModalReducer from "./ReduxModalsStore/DeleteMeritQuestionModal";
import DeleteMeritQuestionsModalReducer from "./ReduxModalsStore/DeleteMeritQuestionsModal";
import DeleteRoleModalReducer from "./ReduxModalsStore/DeleteRoleModal";
import LogOutModalReducer from "./ReduxModalsStore/LogOutModal";
import themeReducer from "./theme";

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ["DeleteFamilyDimensionModal/openDeleteFamilyDimensionModal"],
                // Ignore these field paths in all actions
                ignoredActionPaths: [
                    "meta.arg",
                    "payload.timestamp",
                    "payload.setQuestions",
                    "payload.setMerits",
                    "payLoad.setFamilies",
                    "payload.setDimensions",
                    "payload.refreshDimensionPage",
                    "payload.refreshMeritPage",
                    "payload.setFamilies",
                    "payload.setSelectedRows",
                    "payload.getPage"
                ],
                // Ignore these paths in the state
                ignoredPaths: [
                    "DeleteFamilyDimensionModal.setDimensions",
                    "deleteFamilyDimensionModal.setDimensions",
                    "deleteDimensionMeritModal.setMerits",
                    "copyFamilyDimesionsModal.setFamilies",
                    "copyMeritQuestionsModal.setMerits",
                    "copyMeritsQuestionsModal.setMerits",
                    "deleteMeritQuestionModal.setQuestions",
                    "copyDimesionMeritsModal.refreshDimensionPage",
                    "copyMeritsQuestionsModal.refreshMeritPage",
                    "copyQuestionModal.refreshMeritPage",
                    "deleteRoleModal.setRoles",
                    "deleteFamilyDimensionsModal.setDimensions",
                    "deleteDimensionMeritsModal.setMerits",
                    "deleteMeritQuestionsModal.setQuestions",
                    "copyMeritsQuestionsModal.setSelectedRows",
                    "deleteDimensionMeritModal.setSelectedRows",
                    "deleteFamilyDimensionsModal.setSelectedRows",
                    "deleteDimensionMeritsModal.setSelectedRows",
                    "deleteMeritQuestionsModal.setSelectedRows",
                    "deleteFamilyDimensionModal.getPage",
                    "copyDimesionMeritsModal.setSelectedRows",
                    "deleteDimensionMeritModal.getPage",
                    "deleteFamilyDimensionsModal.getPage",
                    "deleteDimensionMeritsModal.getPage",
                    "copyQuestionModal.setSelectedRows",
                    "deleteMeritQuestionModal.getPage",
                    "deleteMeritQuestionsModal.getPage",
                    "copyFamilyDimesionsModal.getPage"
                ]
            }
        }),

    reducer: {
        layout: layoutReducer,
        theme: themeReducer,
        copyFamilyDimesionsModal: copyFamilyDimesionsModalReducer,
        copyDimesionMeritsModal: CopyDimesionMeritsModalReducer,
        copyMeritsQuestionsModal: CopyMeritQuestionsModalReducer,
        copyQuestionModal: CopyQuestionModalReducer,
        deleteFamilyDimensionModal: DeleteFamilyDimesionModalReducer,
        deleteDimensionMeritModal: DeleteDimensionMeritModalReducer,
        deleteMeritQuestionModal: DeleteMeritQuestionModalReducer,
        deleteRoleModal: DeleteRoleModalReducer,
        deleteFamilyDimensionsModal: DeleteFamilyDimesionsModalReducer,
        deleteDimensionMeritsModal: DeleteDimensionMeritsModalReducer,
        deleteMeritQuestionsModal: DeleteMeritQuestionsModalReducer,
        logOutModal: LogOutModalReducer,
        currentUser: currentUserReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
