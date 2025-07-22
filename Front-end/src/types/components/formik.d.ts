import { Option } from "./autoCompleteHighlight";

export interface FormikPropsType {
    initialValues: {
        email: string;
        tel: string;
        password: string;
        name: string;
        family: string;
        province: Option | null;
        city: Option | null;
    };
}
