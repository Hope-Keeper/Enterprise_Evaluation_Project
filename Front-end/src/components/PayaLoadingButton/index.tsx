import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

function PayaLoadingButton(props: LoadingButtonProps) {
    const { children, ...restProps } = props;

    return <LoadingButton {...restProps}>{children}</LoadingButton>;
}

export default PayaLoadingButton;
