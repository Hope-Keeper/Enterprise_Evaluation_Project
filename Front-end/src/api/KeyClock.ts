import { AxiosErrorPersonalized, Callback } from "api";
import axios, { AxiosError, AxiosResponse } from "axios";

export const getCallbackViewData = async (params: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}oauth2/callback/${params}`
        );
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const logout = async (params: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_BASE_URL}logout/`,
            { headers: { Authorization: `Bearer ${params}` } }
        );
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};
