import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/AdminDashboard/Sidebar";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <Outlet />
        </div>
    );
};