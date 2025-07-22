import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RoleType } from "api/Role";

function DeleteRoleContent(props: DeleteRoleContentPropsType) {
    const { source_Role } = props;

    return (
        <Box>
            <Grid container mt={0} spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        آیا از پاک کردن نقش{" "}
                        <span
                            style={{
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "24px"
                            }}>
                            {source_Role?.roleTitle}
                        </span>{" "}
                        اطمینان دارید؟
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
export default DeleteRoleContent;

interface DeleteRoleContentPropsType {
    source_Role: RoleType | null;
}
