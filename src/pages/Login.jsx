import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {useDispatch} from "react-redux";
import { useLoginMutation } from '../features/auth/authApiSlice.jsx';
import Spinner from "@/components/ui/Spinner.jsx";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast.js";
import {useNavigate} from "react-router-dom";
import { setCredentials} from "@/features/auth/authSlice.jsx";


const Login = () => {

    const { toast } = useToast();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters." })
    });
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const handleSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            dispatch(setCredentials({
                token: userData.token,
                role: userData.role,
                name: userData.name ,
                last_name : userData.last_name ,
            }));
            navigate(`/${userData.role}`);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: "Invalid credentials",
            });
        }
    };


    return isLoading ? (
        <div className="flex w-screen justify-center items-center">
            <Spinner/>
        </div>
    ) : (
        <div className="flex w-screen justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Log in by entering your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        {...methods.register("email")}
                                        autoComplete="off"
                                    />
                                    <p className="text-red-600 text-xs">{methods.formState.errors.email?.message}</p>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        {...methods.register("password")}
                                    />
                                    <p className="text-red-600 text-xs">{methods.formState.errors.password?.message}</p>
                                </div>
                            </div>
                            <CardFooter className="flex justify-between pt-8">
                                <Button variant="outline" type="reset">Cancel</Button>
                                <Button type="submit">Login</Button>
                            </CardFooter>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
