import { BreadCrumb } from "@/components/quizzes/BreadCrumb.jsx";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "@/features/auth/authSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import QA_Card from "@/components/q&a/Q&A_Card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import {useDebouncedValue} from "@/hooks/useDebouncedValue.jsx";
import {useQA} from "@/hooks/useQA.jsx";
import {useAssignQuizQuestionsMutation , useGetQuizQuestionsQuery} from "@/features/quizzes/quizzesApiSlice.jsx";
import {Button} from "@/components/ui/button.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import {useLocation, useParams} from 'react-router-dom';
import {ReloadIcon} from "@radix-ui/react-icons";


export default function Assign_QA_QuizPage() {


    const location = useLocation();
    const { quizTitle } = location.state || {};
    const { toast } = useToast();
    const role = useSelector(selectCurrentRole);
    const { quizId } = useParams();
    const [queryParams, setQueryParams] = useState({ page: 1, per_page: 5 });
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 1000);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const { data: quizQuestions, isLoading: quizQuestionsLoading, isError: quizQuestionsError } = useGetQuizQuestionsQuery({ quizId });
    const { data   , handlePaginationChange } = useQA({
        queryParams,
        setQueryParams,
        searchQuery: debouncedSearchQuery,
    });
    const [assignQuizQuestions , {isLoading}] = useAssignQuizQuestionsMutation();

    useEffect(() => {
        setQueryParams((prev) => ({ ...prev, page: 1 }));
    }, [debouncedSearchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions(prev =>
            prev.includes(questionId)
                ? prev.filter(id => id !== questionId)
                : [...prev, questionId]
        );
    };

    const handleSubmitQuestions = async () => {
        const formattedQuestions = selectedQuestions.map(id => ({ id }));
        try {
            await assignQuizQuestions({
                body: { questions: formattedQuestions },
                quizId
            });
            toast({
                title: "Questions assigned successfully!",
                description: "All Good !",
            })
            setSelectedQuestions([]);
        } catch (error) {
            console.error("Error assigning questions:", error);
            toast({
                title: "Failed to assign questions. Please try again.",
                description: "Not Good !",
            })
        }
    };
    const filteredSearchResults = data?.data
        ? data.data.filter(
            question => !Array.isArray(quizQuestions) || !quizQuestions.some(q => q.id === question.id)
        )
        : [];

    return (
        <main className="w-screen p-6 h-screen flex flex-col">
            <div className="px-4 py-4">
                <BreadCrumb route="quizzes" role={role} origin="Quiz" action="Assign" action_text={"Questions"}/>
            </div>
            <div className="flex items-center space-x-4 mb-8 mt-2">
                <h1 className="text-2xl font-bold">Quiz Title :</h1>
                <span className="text-2xl font-semibold">{quizTitle}</span>
            </div>
            <section className="mt-4 flex-1 overflow-y-auto">
                {quizQuestionsLoading ? (
                    <div className="flex w-full justify-center items-center">
                        <Spinner />
                    </div>
                ) : quizQuestionsError ? (
                    <div className="text-red-500">Failed to load quiz questions.</div>
                ) : quizQuestions?.length === 0 ? (
                    <div className="text-gray-500">No questions have been assigned to this quiz yet.</div>
                ) : (
                    <>
                        <div>
                        <div className="sticky top-0 z-10 bg-white p-2">
                                <Input
                                    type="text"
                                    placeholder="Search for questions..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="border rounded mb-4 w-full"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Search Results:</h2>
                            <QA_Card
                                data={{data: filteredSearchResults}}
                                pagination={
                                    data
                                        ? {
                                            pageIndex: data.current_page,
                                            pageSize: data.per_page,
                                            pageCount: data.last_page,
                                            canNextPage: !!data.next_page_url,
                                            canPreviousPage: !!data.prev_page_url,
                                        }
                                        : {}
                                }
                                canPaginate={true}
                                onPaginationChange={handlePaginationChange}
                                selectedQuestions={selectedQuestions}
                                onQuestionSelect={handleQuestionSelect}
                                text={"Assign"}
                            />
                        </div>
                        <div className="flex justify-between items-center sticky bottom-0 bg-white p-4 ">
                            <p className="text-sm">
                                Selected: {selectedQuestions.length} | Total Quiz
                                Questions: {quizQuestions?.length || 0}
                            </p>
                            {!isLoading ?
                                <Button
                                    onClick={handleSubmitQuestions}
                                    disabled={selectedQuestions.length === 0}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Assign Selected Questions
                                </Button>
                                :
                                <Button className=" bg-blue-200">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait
                                </Button>
                            }
                        </div>
                        <h2 className="text-2xl font-bold mt-8 mb-4">Quiz Questions:</h2>
                        <QA_Card
                            data={{data: quizQuestions || []}}
                        />
                    </>
                )}
            </section>
        </main>
    );
}