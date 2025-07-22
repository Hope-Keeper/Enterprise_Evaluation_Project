// you can create your APIs in this folder and export them like below

import { AxiosResponse } from "axios";

export type Callback = (isok: boolean, res: AxiosResponse | AxiosErrorPersonalized) => void;

export interface AxiosErrorPersonalized {
    data: string;
    result?: string;
    status: number;
    detail: string;
    message?: string;
}
