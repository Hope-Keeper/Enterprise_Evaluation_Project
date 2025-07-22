import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";

function ReihanDebouncedTextField(props: TextFieldProps) {
    const { disabled, onChange, ...restProps } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [touched, setTouched] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(
            () => {
                if (searchTerm && touched && !loading) {
                    setLoading(true);

                    // you api call function here
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            },
            searchTerm ? 700 : 0
        );

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <TextField
            disabled={disabled || loading}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTouched(true);
                setSearchTerm(e.target.value);
                onChange?.(e);
            }}
            InputProps={{
                endAdornment: searchTerm !== "" && (
                    <IconButton
                        aria-label="clear"
                        onClick={() => {
                            !loading && setSearchTerm("");
                        }}>
                        {loading ? <CircularProgress color="inherit" size={20} /> : <ClearIcon />}
                    </IconButton>
                )
            }}
            {...restProps}
        />
    );
}

export default ReihanDebouncedTextField;
