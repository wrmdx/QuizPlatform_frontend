import { useState } from 'react';
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
import {selectCurrentName} from "@/features/auth/authSlice.jsx";

const ChangePasswordDialog = () => {

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
    const userName = useSelector(selectCurrentName) ;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleChangePassword = async () => {
        const result = changePasswordSchema.safeParse({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error.errors[0].message,
            });
            return;
        }

        try {
            await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword
            }).unwrap();
            toast({
                variant: "success",
                title: "Success",
                description: "Password changed successfully.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to change the password.",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full" asChild>
                <Button className="w-full flex items-center hover:bg-blue-400 hover:text-white"
                        variant="secondary"
                >
                    <CircleUserRound/>
                    <div className="font-medium dark:text-white w-full inline-flex justify-start ml-2">
                        <p>{userName}</p>
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
                <div className="space-y-4">
                    <Input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleChangePassword} disabled={isLoading}>
                        {isLoading ? (
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            'Change Password'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangePasswordDialog;
