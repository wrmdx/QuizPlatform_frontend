import { Button } from "@/components/ui/button.jsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useUpdateUserMutation } from "@/features/users/usersApiSlice.jsx";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormLabel, FormItem, FormField, FormControl, FormMessage } from "@/components/ui/form"
import { useState } from "react";

export const EditUserSheet = ({id,firstName,lastName,email}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const { toast } = useToast();


    const formSchema = z.object({
        first_name: z.string().min(2, "First name is required").max(50),
        last_name: z.string().min(2, "Last name is required").max(50),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long").optional(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password:''
        },
    });
    const onSubmit = async (data) => {
        try {
            console.log(data) ;
            const result = await updateUser({ id,data }).unwrap();
            console.log(result.message) ;
            toast({
                description: result.message,
            });
            setIsOpen(false);
            form.reset();
        } catch (err) {
            console.error('Failed to update user:', err);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="text-blue-500">
                    Edit
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="First Name"
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Last Name"
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Email"
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Leave blank to keep current password"
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <SheetClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
