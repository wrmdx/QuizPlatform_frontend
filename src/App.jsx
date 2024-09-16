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
import Quiz from "@/pages/Admin/Quiz/Quiz.jsx";
import {AddQuizPage} from "@/pages/Admin/Quiz/AddQuizPage.jsx";
import PublicRoute from "@/features/auth/publicRoute.jsx";
import Assign_QA_QuizPage from "@/pages/Admin/Quiz/Assign_Q&A_QuizPage.jsx";
import View_QA_QuizPage from "@/pages/Admin/Quiz/View_QA_QuizPage.jsx";


function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />} loader={rootLoader}>
                <Route path="/login"  element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="unauthorized" element={<ErrorPage />} />

                <Route path="admin" element={<RequireAuthRole allowedRoles={['admin']} />}>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="qa" element={<QA />} />
                    <Route path="quizzes" element={<Quiz />} />
                    <Route path="quizzes/add" element={<AddQuizPage />} />
                    <Route path="quizzes/assign_qa" element={<Assign_QA_QuizPage />} />
                    <Route path="quizzes/view_qa/:quizId" element={<View_QA_QuizPage />} />
                </Route>

                <Route path="manager" element={<RequireAuthRole allowedRoles={['manager']} />}>
                    <Route path="" element={<ManagerDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="qa" element={<QA />} />
                    <Route path="quizzes" element={<Quiz />} />
                    <Route path="quizzes/add" element={<AddQuizPage />} />
                    <Route path="quizzes/assign_qa" element={<Assign_QA_QuizPage />} />
                    <Route path="quizzes/view_qa/:quizId" element={<View_QA_QuizPage />} />
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
