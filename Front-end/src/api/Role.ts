import { AxiosErrorPersonalized, Callback } from "api";
import { AxiosError, AxiosResponse } from "axios";
import createAxiosConfig from "services";

const Axios = createAxiosConfig();

export const changeRole = async (newRole: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.patch(`change-role/?newRole=${newRole}`);
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const assignQuestionsToRole = async (
    roleId: string,
    questionIdsForInsert: string,
    questionIdsForDelete: string,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.post("assignQuestionToRole/", {
            roleId,
            questionIdsForInsert,
            questionIdsForDelete
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getQuestionsOfRoleById = async (roleId: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(`assignQuestionToRole/${roleId}/`);
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getAllRoles = async (callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get("role/");
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const createNewRole = async (
    roleTitle: string,
    roleCoefficient: number,
    roleIsActive: boolean,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.post("role/", {
            roleTitle,
            roleCoefficient,
            roleIsActive
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const editRoleById = async (
    callback: Callback,
    roleId: string,
    roleTitle: string,

    roleCoefficient: number,
    roleIsActive?: boolean
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.patch(`role/${roleId}/`, {
            roleTitle,
            roleIsActive,
            roleCoefficient
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const deleteRoleById = async (roleId: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.delete(`role/${roleId}/`);
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export interface RoleType {
    roleId: string;
    roleIsActive: boolean;
    roleTitle: string;
    updatePermission: boolean;
    roleCoefficient: number;
}
