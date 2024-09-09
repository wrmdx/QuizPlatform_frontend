import { useParams } from "react-router-dom";
import { useGetQuizQuestionsQuery, useDeleteQuizQuestionsMutation } from "@/features/quizzes/quizzesApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import QA_Card from "@/components/q&a/Q&A_Card.jsx";
import { Button } from "@/components/ui/button.jsx";
import {useState} from "react";
import {BreadCrumb} from "@/components/quizzes/BreadCrumb.jsx";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";
import {useToast} from "@/components/ui/use-toast.js";

export default function View_QA_QuizPage() {


    const { toast } = useToast();
    const role = useSelector(selectCurrentRole);
    const { quizId } = useParams();
    const { data: quizQuestions, isLoading: quizQuestionsLoading, isError: quizQuestionsError } = useGetQuizQuestionsQuery({ quizId });
    const [deleteQuizQuestions] = useDeleteQuizQuestionsMutation();
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions(prev =>
            prev.includes(questionId)
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
        );
    };

    const handleDeleteQuestion = async () => {
        const formattedQuestions = selectedQuestions.map(id => ({ id }));
        try {
            await deleteQuizQuestions({
                quizId,
                body: { questions:formattedQuestions}
            });
            setSelectedQuestions([]);
            toast({
                title: "Questions deleted successfully!",
                description: "All Good !",
            })
        } catch (error) {
            console.error("Error deleting question:", error);
            alert("Failed to delete question. Please try again.");
        }
    };

    return (
        <main className="w-screen p-6 h-screen flex flex-col">
            <div className="px-4 py-6">
                <BreadCrumb route="quizzes" role={role} text="Questions" action="View"/>
            </div>
            <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
            {quizQuestionsLoading ? (
                <div className="flex w-full justify-center items-center">
                    <Spinner/>
                </div>
            ) : quizQuestionsError ? (
                <div className="text-red-500">Failed to load quiz questions.</div>
            ) : quizQuestions?.length === 0 ? (
                <div className="text-gray-500">No questions have been assigned to this quiz yet.</div>
            ) : (
                <QA_Card
                    data={{data: quizQuestions}}
                    pagination={{pageIndex: 1, pageSize: quizQuestions.length, pageCount: 1}}
                    onPaginationChange={() => {
                    }}
                    onQuestionDelete={handleDeleteQuestion}
                    selectedQuestions={selectedQuestions}
                    onQuestionSelect={handleQuestionSelect}
                    text={`Delete`}
                />

            )}
            <div className="flex justify-between items-center sticky bottom-0 bg-white p-4 ">
                <p className="text-sm">
                    Selected: {selectedQuestions.length} | Total Quiz
                    Questions: {quizQuestions?.length || 0}
                </p>
                <Button
                    onClick={handleDeleteQuestion}
                    disabled={selectedQuestions.length === 0}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Delete Selected Questions
                </Button>
            </div>
        </main>
    );
}
