import { useTheme } from "@emotion/react";
import { autocompleteClasses, styled, TextFieldProps, useMediaQuery } from "@mui/material";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import ReihanTextField from "components/ReihanTextField";
import ReihanTypography from "components/ReihanTypography";
import React, { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { Option } from "types/components/autoCompleteHighlight";

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING
    };

    // eslint-disable-next-line no-prototype-builtins
    if (dataSet.hasOwnProperty("group")) {
        return (
            <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    const { key, ...optionProps } = dataSet[0];

    return (
        <ReihanTypography
            key={key}
            component="li"
            {...optionProps}
            noWrap
            style={inlineStyle}
            sx={{ direction: "ltr !important" }}>
            {`${(index + 1).toLocaleString()} - ${dataSet[1]}`}
        </ReihanTypography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
    function ListboxComponent(props, ref) {
        const { children, ...other } = props;
        const itemData: React.ReactElement<unknown>[] = [];
        (children as React.ReactElement<unknown>[]).forEach(
            (
                item: React.ReactElement<unknown> & {
                    children?: React.ReactElement<unknown>[];
                }
            ) => {
                itemData.push(item);
                itemData.push(...(item.children || []));
            }
        );

        const theme = useTheme();
        const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
            noSsr: true
        });
        const itemCount = itemData.length;
        const itemSize = smUp ? 36 : 48;

        const getChildSize = (child: React.ReactElement<unknown>) => {
            // eslint-disable-next-line no-prototype-builtins
            if (child.hasOwnProperty("group")) {
                return 48;
            }

            return itemSize;
        };

        const getHeight = () => {
            if (itemCount > 8) {
                return 8 * itemSize;
            }
            return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
        };

        const gridRef = useResetCache(itemCount);

        return (
            <div ref={ref}>
                <OuterElementContext.Provider value={other}>
                    <VariableSizeList
                        itemData={itemData}
                        height={getHeight() + 2 * LISTBOX_PADDING}
                        width="100%"
                        ref={gridRef}
                        outerElementType={OuterElementType}
                        innerElementType="ul"
                        itemSize={(index: number) => getChildSize(itemData[index])}
                        overscanCount={5}
                        itemCount={itemCount}>
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>
        );
    }
);

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: "border-box",
        "& ul": {
            padding: 0,
            margin: 0
        }
    }
});

export default function ReihanVirtualizedAutoComplete(
    props: ReihanVirtualizedAutoCompletePropsType
) {
    const { value, setValue, options, ...restProps } = props;

    return (
        <Autocomplete
            sx={{ width: 300 }}
            disableListWrap
            options={options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <ReihanTextField {...params} label="100,000 اسم و فامیل" />}
            renderOption={(props, option, state) =>
                [props, option.title, state.index] as React.ReactNode
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderGroup={(params) => params as any}
            value={value}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_e: SyntheticEvent, newValue: Option | null) => {
                if (value?.id === newValue?.id) return;
                return setValue(newValue);
            }}
            slots={{
                popper: StyledPopper
            }}
            slotProps={{
                listbox: {
                    component: ListboxComponent
                }
            }}
            {...restProps}
        />
    );
}

interface ReihanVirtualizedAutoCompletePropsType
    extends Omit<AutocompleteProps<Option, false, false, false>, "renderInput" | "options"> {
    label?: TextFieldProps["label"];
    error?: TextFieldProps["error"];
    helperText?: TextFieldProps["helperText"];
    disabledOptionIds?: (string | number)[];
    value: Option | null;
    setValue: Dispatch<SetStateAction<Option | null>>;
    options: Option[];
}
