import { Button } from "@/components/ui/button.jsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import { useDeleteQuestionMutation } from "@/features/questions/questionsApiSlice.jsx";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {useState} from "react";
import {Trash2} from "lucide-react";

export const DeleteQuestionSheet = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();
    const { toast } = useToast();


    const handleDelete = async () => {
        try {
            const result = await deleteQuestion(id).unwrap();
            toast({
                description: result.message,
            });
            setIsOpen(false);
        } catch (err) {
            console.error('Failed to delete the question:', err);
            toast({
                variant: 'destructive' ,
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="text-red-500">
                    <Trash2/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Confirm Deletion</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    Are you sure you want to delete this question? This action cannot be undone.
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
