import { Input } from "@/components/ui/input.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogContent, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from 'zod';
import { useChangePasswordMutation } from "@/features/users/usersApiSlice.jsx";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button.jsx";
import { ReloadIcon } from "@radix-ui/react-icons";
import {CircleUserRound} from "lucide-react";
import {useSelector} from "react-redux";
import {selectCurrentLastName, selectCurrentName} from "@/features/auth/authSlice.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

const ChangePasswordDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const changePasswordSchema = z.object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string()
            .min(8, "New password must be at least 8 characters long")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    const first_name = useSelector(selectCurrentName) ;
    const last_name = useSelector(selectCurrentLastName) ;
    const { toast } = useToast();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            await changePassword({
                current_password: data.currentPassword,
                password: data.newPassword,
                password_confirmation: data.confirmPassword
            }).unwrap();
            toast({
                variant: "success",
                title: "Success",
                description: "Password changed successfully.",
            });
            setIsOpen(false);
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to change the password.",
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger className="w-full" asChild>
                <Button className="w-full flex items-center hover:bg-blue-400 hover:text-white"
                        variant="secondary"
                >
                    <CircleUserRound/>
                    <div className="font-medium dark:text-white w-full inline-flex justify-start ml-2">
                        <p>{first_name} {last_name}</p>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Password</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter your current password and the new password to change it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Current Password"
                            {...form.register('currentPassword')}
                            disabled={isLoading}
                        />
                        <Input
                            type="password"
                            placeholder="New Password"
                            {...form.register('newPassword')}
                            disabled={isLoading}
                        />
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            {...form.register('confirmPassword')}
                            disabled={isLoading}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Button>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait
                                </Button>
                            ) : (
                                'Save changes'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
);
};

export default ChangePasswordDialog;
