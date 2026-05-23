import { Outlet } from "react-router-dom";
import './custom.css'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { DataProvider } from "../providers/ContextData.jsx";

export default function Layout() {
    return (
        <DataProvider>
            <div className="layout">
                <Header />
                <main className="layout-content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </DataProvider>
    )
}