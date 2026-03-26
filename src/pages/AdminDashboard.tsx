import ProductForm from "../components/AdminDashboard/ProductForm";
import { Sidebar } from "../components/AdminDashboard/Sidebar";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.ProductForm}>
                <ProductForm />
            </div>
        </div>
    );
};