import {  useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentRole, selectCurrentToken} from "@/features/auth/authSlice";
import {LogOut} from "lucide-react";
import Spinner from "@/components/ui/Spinner.jsx";
import {Link} from "react-router-dom"
import Navmenu from "@/components/ui/navMenu.jsx";
import { getRoutesByRole } from '@/routes/routes';
import ChangePasswordDialog from "@/components/users/ChangePasswordDialog.jsx";



const SideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const { toast } = useToast();
    const { token } = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentRole)
    const routes = getRoutesByRole(role);

    const handleLogout = async () => {
        try {
            if (token) {
                await logout(token).unwrap();
            }
        } catch (error) {
            console.error("Logout failed", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to log out. Your session might have expired.",
            });
        } finally {
            dispatch(logOut())
            navigate('/login');
        }
    };

    return (
        <div className="flex">
            <nav className="flex flex-col justify-between border-l border px-4 py-3 w-full">
                <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6" id="logo">
                    <Link to={role+"/dashboard"} className="flex items-center gap-2 font-semibold">
                            <span className="border-b text-2xl">
                                <span className="text-blue-700">KJR</span>
                                Quiz</span>
                    </Link>
                </div>
                <div className="mt-40">
                    <Navmenu routes={routes}/>
                </div>
                <div className="mt-auto">
                    <div className="mb-4">
                        <ChangePasswordDialog/>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full inline-flex justify-start"
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <Spinner className="mr-2"/>
                                    ) : (
                                        <LogOut className="mr-2 h-4 w-4"/>
                                    )}
                                    Sign out
                                </Button>
                        </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will log you out.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogout}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                    </AlertDialog>

                    </div>
            </nav>
        </div>

);
};

export default SideBar;
