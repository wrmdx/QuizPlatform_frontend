import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useUpdateQuizMutation } from "@/features/quizzes/quizzesApiSlice";
import { useToast } from "@/components/ui/use-toast.js";

const quizSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must not exceed 100 characters"),
});

const EditQuizDialog = ({ id, title }) => {
    const [updateQuiz, { isLoading }] = useUpdateQuizMutation();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            title: title,
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const result = await updateQuiz({ quizId: id, title: data.title }).unwrap();
            console.log(result.message);
            toast({
                description: "Quiz updated successfully",
            });
        } catch (error) {
            console.error("Failed to update quiz", error);
            toast({
                variant: "destructive",
                description: "Failed to update quiz. Please try again.",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-green-500 hover:text-white hover:bg-green-600"
                >
                    Edit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Edit Quiz</AlertDialogTitle>
                <AlertDialogHeader>
                    <AlertDialogDescription>Editing quiz: {title}</AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6 mb-3">
                        <Input
                            type="text"
                            placeholder="New Title"
                            {...register("title")}
                            disabled={isLoading}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditQuizDialog;