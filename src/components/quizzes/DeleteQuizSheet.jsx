import { Button } from "@/components/ui/button.jsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import { useDeleteQuizMutation } from "@/features/quizzes/quizzesApiSlice.jsx";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {useState} from "react";

export const DeleteQuizSheet = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteUser, { isLoading }] = useDeleteQuizMutation();
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteUser(id).unwrap();
            toast({
                description: "Quiz deleted successfully",
            });
            setIsOpen(false);
        } catch (err) {
            console.error('Failed to delete user:', err);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-red-500 hover:text-white hover:bg-red-600"
                >
                    Delete
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Confirm Deletion</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    Are you sure you want to delete this quiz? This action cannot be undone.
                </SheetDescription>
                <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
            </SheetContent>
        </Sheet>
    );
};
