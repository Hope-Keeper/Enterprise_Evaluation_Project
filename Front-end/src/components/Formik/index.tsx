import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import provincesJson from "assets/jsons/provinces.json";
import ReihanAutocompleteHighlight from "components/ReihanAutocompleteHighlight";
import ReihanLoadingButton from "components/ReihanLoadingButton";
import ReihanTextField from "components/ReihanTextField";
import { Form, Formik } from "formik";
import { SyntheticEvent, useEffect, useState } from "react";
import { Option } from "types/components/autoCompleteHighlight";
import { FormikPropsType } from "types/components/formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    family: yup.string().required("Family is required"),
    tel: yup
        .string()
        .matches(/^[0-9]+$/, "Just english numbers")
        .matches(/^09/, "Tel should be start with 09 ")
        .length(11, "Tel should be 11 number lenght")
        .required("Tel is required"),
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .max(16, "Password should be of maximum 16 characters length")
        .required("Password is required"),
    city: yup
        .object()
        .shape({
            id: yup.string().required(),
            title: yup.string().required()
        })
        .required("City is required"),
    province: yup
        .object()
        .shape({
            id: yup.string().required(),
            title: yup.string().required()
        })
        .required("Province is required")
});

function ReihanFormik({ initialValues }: FormikPropsType) {
    const [cities, setCities] = useState<Option[]>([]);

    const [loading, setLoading] = useState(false);

    const handleClick = (values: object) => {
        const delayDebounceFn = setTimeout(() => {
            if (!loading) {
                setLoading(true);
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setLoading(false);
                }, 1000);
            }
        });
        return () => clearTimeout(delayDebounceFn);
    };

    useEffect(() => {
        const provincesArray: Option[] = [];
        provincesJson.map((item) => {
            provincesArray.push({
                id: item.id,
                title: item.name
            });
        });

        setCities([]);
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleClick(values);
            }}>
            {({ touched, errors, handleChange, values, setValues }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ReihanTextField
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                helperText={touched.name && errors.name}
                                error={touched.name && Boolean(errors.name)}
                                handleClickClearButton={() => {
                                    setValues({
                                        ...values,
                                        name: ""
                                    });
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ReihanTextField
                                label="Family"
                                name="family"
                                value={values.family}
                                onChange={handleChange}
                                helperText={touched.family && errors.family}
                                error={touched.family && Boolean(errors.family)}
                                handleClickClearButton={() => {
                                    setValues({
                                        ...values,
                                        family: ""
                                    });
                                }}
                                sx={{ mt: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ReihanTextField
                                label="Tel"
                                name="tel"
                                value={values.tel}
                                onChange={handleChange}
                                helperText={touched.tel && errors.tel}
                                error={touched.tel && Boolean(errors.tel)}
                                handleClickClearButton={() => {
                                    setValues({
                                        ...values,
                                        tel: ""
                                    });
                                }}
                                sx={{ mt: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ReihanTextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                helperText={touched.email && errors.email}
                                error={touched.email && Boolean(errors.email)}
                                handleClickClearButton={() => {
                                    setValues({
                                        ...values,
                                        email: ""
                                    });
                                }}
                                sx={{ mt: 1 }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ReihanTextField
                                label="Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                helperText={touched.password && errors.password}
                                error={touched.password && Boolean(errors.password)}
                                handleClickClearButton={() => {
                                    setValues({
                                        ...values,
                                        password: ""
                                    });
                                }}
                                sx={{ mt: 1 }}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <ReihanAutocompleteHighlight
                                label="استان"
                                getOptionLabel={(option: Option): string => option.title}
                                onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                    const citiesArray: Option[] = [];
                                    citiesJson
                                        .filter((city) => city.province_id === newValue?.id)
                                        .map((item) => {
                                            citiesArray.push({
                                                id: item.id,
                                                title: item.name
                                            });
                                        });
                                    setCities(citiesArray);
                                    setValues({
                                        ...values,
                                        province: newValue,
                                        city: null
                                    });
                                }}
                                value={values.province}
                                helperText={touched.province && errors.province}
                                error={touched.province && Boolean(errors.province)}
                                options={provinces}
                            />
                        </Grid> */}

                        <Grid item xs={12}>
                            <ReihanAutocompleteHighlight
                                label="شهر"
                                getOptionLabel={(option: Option): string => option.title}
                                onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                                    setValues({
                                        ...values,
                                        city: newValue
                                    });
                                }}
                                value={values.city}
                                helperText={touched.city && errors.city}
                                error={touched.city && Boolean(errors.city)}
                                options={cities}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button color="secondary" variant="contained" fullWidth type="reset">
                                Reset
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <ReihanLoadingButton
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                loading={loading}>
                                Submit
                            </ReihanLoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default ReihanFormik;
