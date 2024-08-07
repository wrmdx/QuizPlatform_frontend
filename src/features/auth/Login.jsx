import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice.jsx";
import { useLoginMutation } from './authApiSlice.jsx';
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner.jsx";

const Login = () => {
    const userRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const { toast } = useToast();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email: user, password: pwd }).unwrap();
            dispatch(setCredentials({
                token: userData.token,
                role: userData.role,
                user: userData.name
            }));

            setUser('');
            setPwd('');
            navigate(`/${userData.role}`);
        } catch (err) {
            console.error(err);
            const errorMessage = err?.data?.message || 'An unexpected error occurred';
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage,
            });
        }
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="flex justify-center items-center mt-52">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Log in by entering your credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    ref={userRef}
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between pt-8">
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Login</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
