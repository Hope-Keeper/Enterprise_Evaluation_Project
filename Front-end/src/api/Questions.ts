import { AxiosErrorPersonalized, Callback } from "api";
import { AxiosError, AxiosResponse } from "axios";
import createAxiosConfig from "services";

const Axios = createAxiosConfig();

export const createNewQuestionForMerit = async (
    callback: Callback,
    meritId: string,
    questionContent: string
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.post("question/", {
            questionMeritId: meritId,
            questionContent
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getAllQuestionsOfMeritById = async (
    meritId: string,
    page: number,
    size: number,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(
            `questionCountByMerit/${meritId}/?page=${page}&size=${size}`
        );
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const editQuestionNameById = async (
    questionId: string,
    questionContent: string,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.patch(`question/${questionId}/`, {
            questionContent
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const editActivationOfQuestionById = async (
    questionId: string,
    questionIsActive: boolean,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.patch(`question/${questionId}/`, {
            questionIsActive
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const deleteQuestionByID = async (questionId: string, callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.delete(`question/${questionId}/`);
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const deleteQuestions = async (
    meritId: string,
    questionIds: string,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.delete("deleteQuestionsByMerit/", {
            data: { meritId, questionIds }
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};
