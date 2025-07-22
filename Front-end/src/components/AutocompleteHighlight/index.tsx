import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

function ReihanAutocompleteHighlight(props: ReihanAutocompleteHighlightPropsType) {
    const { loadingText, loading, label, error, helperText, ...restProps } = props;

    return (
        <Autocomplete
            disableClearable
            loading={loading}
            loadingText={loadingText || "درحال بارگیری ..."}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={helperText}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.title, inputValue, { insideWords: true });
                const parts = parse(option.title, matches);

                return (
                    <li {...props} key={props.id}>
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                        textDecoration: part.highlight ? "underline" : "none"
                                    }}>
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    </li>
                );
            }}
            {...restProps}
        />
    );
}

export default ReihanAutocompleteHighlight;

// must change according to your options data type
interface Option {
    title: string;
    id: string;
}

interface ReihanAutocompleteHighlightPropsType
    extends Omit<AutocompleteProps<Option, false, boolean, false>, "renderInput" | "options"> {
    label?: TextFieldProps["label"];
    error?: TextFieldProps["error"];
    helperText?: TextFieldProps["helperText"];
    options: Option[];
    loading?: boolean;
}
