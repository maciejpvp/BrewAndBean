import { Box, LinearProgress } from "@mui/material";
import styles from "./LoadingPage.module.css";

export const LoadingPage = () => {
    return (
        <div className={styles.container}>
            <Box sx={{ width: '30%' }}>
                <LinearProgress color="secondary" />
            </Box>
        </div>
    );
};