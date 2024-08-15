import { Users, BookCheck , CircleHelp , LayoutDashboard , ClipboardMinus ,ListChecks   } from "lucide-react";


const adminRoutes = [
    { url: "/admin/dashboard", name: "Dashboard", icon: <LayoutDashboard className="mr-2 w-4 h-4" /> },
    { url: "/admin/users", name: "User", icon: <Users className="mr-2 w-4 h-4" /> },
    { url: "/admin/quizzes", name: "Quiz", icon: <BookCheck className="mr-2 w-4 h-4" /> },
    { url: "/admin/questions", name: "Question", icon: <CircleHelp className="mr-2 w-4 h-4" /> },
    { url: "/admin/responses", name: "Response", icon: <ListChecks className="mr-2 w-4 h-4" /> },
    { url: "/admin/reports", name: "Reports", icon: <ClipboardMinus className="mr-2 w-4 h-4" /> },
];

const devRoutes = [
    { url: "/dev/quizzes", name: "My Quizzes", icon: <BookCheck className="mr-2 w-4 h-4" /> },
];

const managerRoutes = [
    { url: "/manager/dashboard", name: "Dashboard", icon: <LayoutDashboard className="mr-2 w-4 h-4" /> },
    { url: "/manager/quizzes", name: "Quiz Management", icon: <BookCheck className="mr-2 w-4 h-4" /> },
];

export const getRoutesByRole = (role) => {
    switch (role) {
        case "admin":
            return adminRoutes;
        case "dev":
            return devRoutes;
        case "manager":
            return managerRoutes;
        default:
            return [];
    }
};
