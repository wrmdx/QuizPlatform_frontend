import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login.jsx';
import RequireAuth from "@/features/auth/RequireAuth.jsx";
import Layout from "@/components/Layout";  // Assuming you have a Layout component
import AdminDashboard from "@/pages/Admin/Home.jsx";  // Admin-specific component
import ManagerDashboard from "@/pages/Manager/Home.jsx";  // Manager-specific component
import DeveloperDashboard from "@/pages/Developer/Home.jsx";  // Developer-specific component
import ErrorPage from "@/pages/Error/ErrorPage.jsx";
import Welcome from "@/pages/Welcome.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setCredentials} from "@/features/auth/authSlice.jsx";

function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            dispatch(setCredentials({ token,role }));
        }
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<ErrorPage />} />

                <Route element={<RequireAuth allowedRoles={['admin']} />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="welcome" element={<Welcome />} />

                </Route>

                <Route element={<RequireAuth allowedRoles={['manager']} />}>
                    <Route path="manager" element={<ManagerDashboard />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={['dev']} />}>
                    <Route path="developer" element={<DeveloperDashboard />} />
                </Route>

            </Route>
        </Routes>
    );
}

export default App;
