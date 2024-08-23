import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import RequireAuthRole from "@/features/auth/requireAuthRole.jsx";
import Layout from "@/layouts/Layout.jsx";
import AdminDashboard from "@/pages/Admin/Dashboard";
import ManagerDashboard from "@/pages/Manager/Home.jsx";
import DeveloperDashboard from "@/pages/Developer/Home.jsx";
import ErrorPage from "@/pages/Error/ErrorPage.jsx";
import rootLoader from "@/loaders/rootLoader.jsx";
import Users from "@/pages/Admin/Users.jsx"
import QA from "@/pages/Admin/Q&A.jsx"
import Quiz from "@/pages/Admin/Quiz.jsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} loader={rootLoader}>

                <Route path="/login" element={<Login />}/>
                <Route path="unauthorized" element={<ErrorPage />} />

                <Route path="admin" element={<RequireAuthRole allowedRoles={['admin']} />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="qa" element={<QA />} />
                    <Route path="quizzes" element={<Quiz />} />


                </Route>

                <Route path="manager" element={<RequireAuthRole allowedRoles={['manager']} />}>
                    <Route path="" element={<ManagerDashboard />} />
                    <Route path="dahsboard" element={<ManagerDashboard />} />
                </Route>

                <Route path="dev" element={<RequireAuthRole allowedRoles={['dev']} />}>
                    <Route path="" element={<DeveloperDashboard />} />
                    <Route path="myquiz" element={<DeveloperDashboard />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />

            </Route>
        </Routes>
    );
}

export default App;
