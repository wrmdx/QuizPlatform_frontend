import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import RequireAuth_Role from "@/features/auth/RequireAuth_Role.jsx";
import Layout from "@/layouts/Layout.jsx";
import AdminDashboard from "@/pages/Admin/Dashboard";
import ManagerDashboard from "@/pages/Manager/Home.jsx";
import DeveloperDashboard from "@/pages/Developer/Home.jsx";
import ErrorPage from "@/pages/Error/ErrorPage.jsx";
import rootLoader from "@/loaders/rootLoader.jsx";
import Users from "@/pages/Admin/Users.jsx"
import Questions from "@/pages/Admin/Questions.jsx"


function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} loader={rootLoader}>

                <Route path="login" element={<Login />}/>
                <Route path="unauthorized" element={<ErrorPage />} />

                <Route path="admin" element={<RequireAuth_Role allowedRoles={['admin']} />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="questions" element={<Questions />} />

                </Route>

                <Route path="manager" element={<RequireAuth_Role allowedRoles={['manager']} />}>
                    <Route path="" element={<ManagerDashboard />} />
                    <Route path="dahsboard" element={<ManagerDashboard />} />
                </Route>

                <Route path="dev" element={<RequireAuth_Role allowedRoles={['dev']} />}>
                    <Route path="" element={<DeveloperDashboard />} />
                    <Route path="myquiz" element={<DeveloperDashboard />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />

            </Route>
        </Routes>
    );
}

export default App;
