import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import {Plus, Trash2} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAddQuestionMutation } from "@/features/questions/questionsApiSlice.jsx";
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useAddResponseMutation, useSetResponsesMutation} from "@/features/responses/responsesApiSlice.jsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input"



const formSchema = z.object({
    description: z.string().min(2, "Description is required"),
    duration: z.preprocess((value) => Number(value), z.number().min(3, "Duration must be at least 3")),
    type_name: z.enum(["qcm", "qcu"], {
        errorMap: () => ({ message: "Please select a question type" })
    }),
    responses: z.array(z.object({
        description: z.string().min(1, "Response description is required"),
        iscorrect: z.boolean()
    })),
});

export function AddQuestionForm() {

    const [addQuestion , {isLoading : isAddingQuestion}] = useAddQuestionMutation();
    const [addResponses ,{isLoading : isAddingResponses}] = useAddResponseMutation();
    const [assignResponses , {isLoading : isAssigning}] = useSetResponsesMutation();
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [responses, setResponses] = useState([{ description: "", iscorrect: false }]);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            duration:1 ,
            type_name: 'qcu',
            responses: responses
        },
    });
    const handleResponseChange = (index, key, value) => {
        const updatedResponses = responses.map((response, i) =>
            i === index ? { ...response, [key]: value } : response
        );
        setResponses(updatedResponses);
        form.setValue('responses', updatedResponses);
    };
    const handleRadioChange = (selectedIndex) => {
        const updatedResponses = responses.map((response, index) => ({
            ...response,
            iscorrect: index === selectedIndex
        }));
        setResponses(updatedResponses);
        form.setValue('responses', updatedResponses);
    };
    const addResponseField = () => {
        setResponses([...responses, { description: "", iscorrect: false }]);
    };
    const handleRemoveResponse = (index) => {
        const newResponses = responses.filter((_, i) => i !== index);
        setResponses(newResponses);
        form.setValue('responses', newResponses);
    };

    const onSubmit = async (data) => {
        const { description,duration ,  type_name, responses } = data;

        const questionData = {
            description: description,
            duration: duration ,
            type_name: type_name,
        };

        const responseDataForAdding = responses.map((response) => ({
            description: response.description,
        }));

        try {
            const question = await addQuestion(questionData).unwrap();
            console.log('Question created:', question);

            if (question.id) {
                const questionId = question.id;

                const createdResponses = await addResponses({ body: { responses: responseDataForAdding } }).unwrap();
                console.log('Responses created:', createdResponses);

                const responsesForAssigning = createdResponses.map((createdResponse, index) => ({
                    id: createdResponse.id,
                    iscorrect: responses[index].iscorrect,
                }));

                console.log('Responses for assigning:', responsesForAssigning);

                await assignResponses({
                    body: { responses: responsesForAssigning },
                    questionId
                }).unwrap();

                setDialogOpen(false);

                toast({
                    description: "Q&A created successfully",
                });
                setResponses([{ description: "", iscorrect: false }]);
                form.reset();
            }
            else {
                console.log('Question creation failed.');
                toast({
                    description: "Question creation failed.",
                });
            }
        } catch (err) {
                console.error('Submission Error:', err);
                toast({
                    title: "Uh oh! Something went wrong.",
                    variant: "destructive",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
    };

    return (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"  className="mr-4">
                        <Plus className="h-4 w-4" /> Add Q&A
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-2xl max-h-svh overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Q&A</DialogTitle>
                        <DialogDescription>
                            Add question here
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select question type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="qcu">QCU</SelectItem>
                                                <SelectItem value="qcm">QCM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />
                            <DialogDescription>
                                Add responses here. Click submit to save.
                            </DialogDescription>
                            {responses.map((response, index) => (
                                <div key={index} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`responses[${index}].description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Response {index + 1}</FormLabel>
                                                <Button variant="ghost" className="text-red-500 ml-2" onClick={() => handleRemoveResponse(index)}>
                                                    <Trash2 className="size-4 text-red-500"/>
                                                </Button>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        value={response.description}
                                                        onChange={(e) => handleResponseChange(index, 'description', e.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {form.watch('type_name') === 'qcu' ? (
                                        <RadioGroup
                                            value={response.iscorrect ? `${index}` : ''}
                                            onValueChange={() => handleRadioChange(index)}
                                        >
                                            <RadioGroupItem value={`${index}`} id={`response-radio-${index}`} />
                                            <label htmlFor={`response-radio-${index}`}>Correct</label>
                                        </RadioGroup>
                                    ) : (
                                        <Checkbox
                                            checked={response.iscorrect}
                                            onCheckedChange={(checked) => handleResponseChange(index, 'iscorrect', checked)}
                                        />
                                    )}
                                </div>
                            ))}

                            <Button type="button" variant="outline" onClick={addResponseField}>
                                Add Response
                            </Button>

                            <DialogFooter>
                                {isAddingQuestion || isAddingResponses || isAssigning ? (
                                        <Button disabled>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                Please wait
                                        </Button>
                                    ) : (
                                    <Button type="submit">Submit</Button>
                                    )}
                                    <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => {
                                        form.reset();
                                        setResponses([{ description: "", iscorrect: false }]);
                                        setDialogOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    );
}