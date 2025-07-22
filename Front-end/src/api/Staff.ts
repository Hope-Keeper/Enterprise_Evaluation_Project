import { AxiosErrorPersonalized, Callback } from "api";
import { AxiosError, AxiosResponse } from "axios";
import createAxiosConfig from "services";

const Axios = createAxiosConfig();

export const getAllStaffEvaluations = async (
    unitId: string,
    programId: string,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(
            `unitPersonnelEvaluation/${unitId}/${programId}/`
        );
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getAllUnratedStaffEvaluationsByProgramId = async (
    callback: Callback,
    programId: string,
    personnelHireDateGreaterThan?: string,
    personnelHireDateLessThan?: string
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(`/notEvaluatedPersonnel/${programId}/`, {
            params: { personnelHireDateLessThan, personnelHireDateGreaterThan }
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getAllUnratedStaffEvaluations = async (
    callback: Callback,

    personnelHireDateGreaterThan?: string,
    personnelHireDateLessThan?: string
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get("/notEvaluatedPersonnel/all/", {
            params: { personnelHireDateLessThan, personnelHireDateGreaterThan }
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};
export const getAllUnknownStaffEvaluations = async (
    page: number,
    size: number,
    callback: Callback,
    personnelFirstName?: string,
    personnelLastName?: string,
    personnelOrganizationID?: string,
    personnelUnitId?: string,
    personnelHireDateGreaterThan?: string,
    personnelHireDateLessThan?: string
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(
            `/changeEvaluator/?page=${page}&size=${size}`,
            {
                params: {
                    personnelFirstName,
                    personnelLastName,
                    personnelOrganizationID,

                    personnelUnitId,
                    personnelHireDateGreaterThan,
                    personnelHireDateLessThan
                }
            }
        );
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getCurrentPersonnelInformation = async (callback: Callback): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get("/get-current-user/");
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const changeEvaluatorForPerson = async (
    changeEvaluatorId: string,
    changeEvaluatorEvaluatorPersonnelId: string,
    changeEvaluatorDescription: string | null,
    changeEvaluatorResult: boolean,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.patch(`/changeEvaluator/${changeEvaluatorId}`, {
            changeEvaluatorEvaluatorPersonnelId,
            changeEvaluatorDescription,
            changeEvaluatorResult
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const getPersonnelInformation = async (
    personnelId: string,
    callback: Callback
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get(`/serviceStatusOfPerson/${personnelId}/`);
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export const filterFromPersonnelInformation = async (
    callback: Callback,
    personnelId?: string,
    personnelFirstName?: string,
    personnelLastName?: string,
    personnelOrganizationID?: string,
    personnelNationalCode?: string,
    unitId?: string,
    personnelHireDateGreaterThan?: string,
    personnelHireDateLessThan?: string
): Promise<void> => {
    try {
        const response: AxiosResponse = await Axios.get("/filterFromPersonnel/", {
            params: {
                personnelId,
                personnelFirstName,
                personnelLastName,
                personnelOrganizationID,
                personnelNationalCode,
                unitId,
                personnelHireDateGreaterThan,
                personnelHireDateLessThan
            }
        });
        callback(true, response);
    } catch (err) {
        const error = err as AxiosError;
        callback(false, error.response?.data as AxiosErrorPersonalized);
    }
};

export interface BasePersonnelType {
    personnelId: string; //----------------------------- "شناسه"
    personnelFirstName: string; //---------------------- "نام"
    personnelLastName: string; //----------------------- "نام خانوادگی"
}
