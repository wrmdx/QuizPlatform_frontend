import { QuestionsDataTable } from "@/components/questions/QuestionsDataTable.jsx";
import { columns } from "@/constants/questions/columns.jsx";
import { useGetQuestionsQuery } from "@/features/questions/questionsApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import {useEffect} from "react";
import {questionsLoader} from "@/loaders/questionsLoader.jsx";

const Questions = () => {
    const { data: questions, isLoading, isError } = useGetQuestionsQuery();

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                await questionsLoader();
            } catch (err) {
                console.error('Error loading users:', err);
            }
        };
        loadQuestions();
    },[]);

    if (isLoading) {
        return (
            <div className="flex w-screen justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Failed to load questions.</div>;
    }

    return (
        <div className="w-screen p-4">
            <QuestionsDataTable
                columns={columns}
                data={questions}
            />
        </div>
    );
};

export default Questions;
