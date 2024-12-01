import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button.jsx";
import { useTakeQuizMutation } from "@/features/quizzes/quizzesApiSlice.jsx";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.jsx";
import { setQuestions } from '@/features/quizzes/quizSlice';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";


const otpSchema = z.object({
    token: z.string().length(6, "OTP must be exactly 6 digits long")
});

const TakeQuizPage = () => {
    const [takeQuiz] = useTakeQuizMutation();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            token :''
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log('Submitting data:', data);
            let token = data.token;
            const result = await takeQuiz({token: token}).unwrap();

            console.log('API response:', result);

            if (result && result.questions && result.questions.length!==0 ) {
                console.log('Dispatching setQuestions with:', result.questions);
                dispatch(setQuestions(result.questions));
                // toast({
                //     description: "Quiz data received successfully.",
                // });
                console.log('Quiz data received successfully.')
                navigate('/dev/conditions');
            } else {
                throw new Error("Quiz not ready yet ! ");
            }
        } catch (err) {
            console.error("Failed to take quiz:", err);
            toast({
                title: "Uh oh! Something went wrong.",
                description: err.message || "Failed to start the quiz. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quiz Token</FormLabel>
                            <FormControl>
                        <InputOTP
                            maxLength={6}
                            {...field}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the quiz token to take the desired quiz .
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        </main>
    );
};

export default TakeQuizPage;
