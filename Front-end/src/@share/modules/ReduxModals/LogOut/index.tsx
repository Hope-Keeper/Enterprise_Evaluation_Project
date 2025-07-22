import PayaDialog from "components/PayaDialog";
import PayaLogOutModal from "components/PayaLogOutModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeLogOutModal } from "store/ReduxModalsStore/LogOutModal";
import logout from "@share/Images/logout.png";
function LogOutModalDialog() {
    const LogOutDialogState = useSelector((state: RootState) => state.logOutModal);

    const { isOpen } = LogOutDialogState;

    const dispatch = useDispatch();

    if (!isOpen) return null;
    return (
        <PayaDialog
            maxWidth="sm"
            open={isOpen}
            handleClose={() => {
                dispatch(closeLogOutModal());
            }}
            title="خروج از حساب کاربری"
            DialogContents={<PayaLogOutModal />}
            dangerous
            imageSrc={logout}
            bgImageOpacity={0.4}
        />
    );
}

export default LogOutModalDialog;
