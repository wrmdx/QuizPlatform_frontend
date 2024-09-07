import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAddQuizMutation } from "@/features/quizzes/quizzesApiSlice.jsx";
import { ToastAction } from "@/components/ui/toast"
import {useAddDifficultyMutation, useGetDifficultiesQuery} from "@/features/difficulty/difficultiesApiSlice.jsx";
import {useAddSkillMutation, useGetSkillsQuery} from "@/features/skills/skillsApiSlice.jsx";
import {BreadCrumb} from "@/components/quizzes/BreadCrumb.jsx";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import { useNavigate } from 'react-router-dom';
import {ReloadIcon} from "@radix-ui/react-icons";


const formSchema = z.object({
    title: z.string().min(2, "Title is required").max(100),
    quiz_difficulty: z.string("Select a difficulty"),
    skill: z.string("Select a skill"),
});

export function AddQuizPage() {
    const [isAddingNewDifficulty, setIsAddingNewDifficulty] = useState(false);
    const [newDifficulty, setNewDifficulty] = useState("");
    const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const role = useSelector(selectCurrentRole);
    const { data: difficulties = [] } = useGetDifficultiesQuery();
    const { data: skills = []} = useGetSkillsQuery();
    const [addDifficulty , {isLoading : diffAddLoading}] = useAddDifficultyMutation();
    const [addSkill ,{isLoading : skillAddLoading}] = useAddSkillMutation();
    const [addQuiz, {isLoading : quizAddLoading}] = useAddQuizMutation();
    const { toast } = useToast();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            quiz_difficulty: "",
            skill: "",
        },
    });


    const onSubmit = async (data) => {
        try {
            console.log(data);
            let difficultyName = data.quiz_difficulty;
            let skillName = data.skill;

            const difficultyExists = difficulties.some(
                (difficulty) => difficulty.name.toLowerCase() === data.quiz_difficulty.toLowerCase()
            );
            if (isAddingNewDifficulty && !difficultyExists) {
                const newDifficultyResponse = await addDifficulty({ name: newDifficulty }).unwrap();
                difficultyName = newDifficultyResponse.name;
            }

            const skillExists = skills.some(
                (skill) =>skill.name.toLowerCase() === data.skill.toLowerCase()
            )

            if (isAddingNewSkill && !skillExists) {
                const newSkillResponse = await addSkill({ name: newSkill }).unwrap();
                skillName = newSkillResponse.name;
            }

            const updatedQuizData = {
                ...data,
                quiz_difficulty: difficultyName,
                skill: skillName,
            };
            await addQuiz(updatedQuizData).unwrap();
            toast({
                description: "Quiz created successfully! Assign questions soon...",
            });
            form.reset();
            setIsAddingNewDifficulty(false);
            setIsAddingNewSkill(false);
            setNewDifficulty("");
            setNewSkill("");
            navigate(-1)
        } catch (err) {
            console.error(err);
            toast({
                title: "Uh oh! Something went wrong.",
                variant: "destructive",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <main className="w-screen p-4">
            <div className="px-4 py-4">
                <BreadCrumb role={role} />
            </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="quiz_difficulty"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Difficulty</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            if (value === "add-new") {
                                                setIsAddingNewDifficulty(true);
                                                field.onChange("");
                                            } else {
                                                setIsAddingNewDifficulty(false);
                                                field.onChange(value);
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a difficulty"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {difficulties.map(difficulty => (
                                                <SelectItem key={difficulty.id} value={difficulty.name}>
                                                    {difficulty.name}
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="add-new" className="text-gray-400/20">Click to
                                                add</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {isAddingNewDifficulty && (
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter new difficulty"
                                                value={newDifficulty}
                                                onChange={(e) => setNewDifficulty(e.target.value)}
                                            />
                                        </FormControl>
                                    )}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="skill"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Skill</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => {
                                            if (value === "add-new") {
                                                setIsAddingNewSkill(true);
                                                field.onChange("");
                                            } else {
                                                setIsAddingNewSkill(false);
                                                field.onChange(value);
                                            }
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a skill"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {skills.map(skill => (
                                                <SelectItem key={skill.id} value={skill.name}>
                                                    {skill.name}
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="add-new" className="text-gray-400/20">Click to
                                                add</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {isAddingNewSkill && (
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter new skill"
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                            />
                                        </FormControl>
                                    )}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            {diffAddLoading || quizAddLoading || skillAddLoading ? (
                                <Button disabled>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit">Submit</Button>
                            )}
                        </div>
                    </form>
                </Form>
        </main>
    );
}