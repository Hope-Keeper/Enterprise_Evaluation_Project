import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useEffect, useState } from "react";
import {
    MultiSelectAutoCompleteHighlightPropsType,
    Option
} from "types/components/autoCompleteHighlight";

function ReihanMultiSelectAutocompleteHighlight({
    label,
    options,
    onChange,
    error,
    value,
    helperText
}: MultiSelectAutoCompleteHighlightPropsType) {
    const [loading, setLoading] = useState<boolean>(true);
    // const [options, setOptions] = useState<Option[]>([options]);

    useEffect(() => {
        setTimeout(() => {
            // setOptions(top3Films);
            // setOptions(options);
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Autocomplete
            multiple
            fullWidth
            loading={loading}
            options={options}
            noOptionsText="موردی یافت نشد"
            loadingText="در حال بارگیری ..."
            value={value}
            getOptionLabel={(option: Option): string => option.title}
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
                    <li {...props}>
                        <div>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 900 : 400,
                                        textDecoration: part.highlight ? "underline" : "none"
                                    }}>
                                    {part.text}
                                </span>
                            ))}
                        </div>
                    </li>
                );
            }}
            onChange={onChange}
        />
    );
}

export default ReihanMultiSelectAutocompleteHighlight;

// const top3Films: FilmType[] = [
//     { title: "رستگاری در شائوشنگ", year: 1994 },
//     { title: "پدرخوانده", year: 1972 },
//     { title: "پدرخوانده - قسمت دوم", year: 1974 }
// ];
// const option: Option[] = [
//     { title: "رستگاری در شائوشنگ", id: 1994 },
//     { title: "پدرخوانده", id: 1972 },
//     { title: "پدرخوانده - قسمت دوم", id: 1974 }
// ];

// interface FilmType {
//     title: string;
//     year: number;
// }
