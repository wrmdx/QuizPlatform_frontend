import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSearchQuestionsMutation } from "@/features/questions/questionsApiSlice.jsx";
import { useGetResponsesQuery } from "@/features/responses/responsesApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import {DeleteQuestionSheet} from "@/components/q&a/DeleteQuestionSheet.jsx";



export function QA_Card({ searchQuery }) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [searchQuestions, { data: questions = [], isLoading, isError   }] = useSearchQuestionsMutation();
    const [showResponses, setShowResponses] = useState(false);
    const currentQuestion = questions[currentQuestionIndex];
    const {
        data: responses = [],
        isLoading: responsesLoading,
        isError: responsesError,
    } = useGetResponsesQuery(currentQuestion?.id, { skip: !currentQuestion });

    useEffect(() => {
        setShowResponses(false);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (searchQuery) {
            const timeoutId = setTimeout(() => searchQuestions(searchQuery), 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery]);

    const handleDeleteSuccess = () => {
        searchQuestions(searchQuery);
        setCurrentQuestionIndex(0);
    };

    if (isLoading || responsesLoading) return <div className="flex items-center justify-center"><p>Loading... <Spinner/></p></div>;
    if (isError || responsesError) return <div className="flex items-center justify-center"><p>Error loading data</p></div>;
    if (!questions.length) return <div className="flex items-center justify-center"><p>No questions found!</p></div>;

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    };
    const toggleResponses = () => {
        setShowResponses(!showResponses);
    };

    return (
        <div className="p-4">
            {currentQuestion && (
                <Card className="w-auto">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Question {currentQuestionIndex + 1}</span>
                            <DeleteQuestionSheet id={currentQuestion.id} onDeleteSuccess={handleDeleteSuccess}  />
                        </CardTitle>
                        <CardDescription>Type : {currentQuestion.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {currentQuestion.description}
                    </CardContent>
                    <CardContent>
                        {showResponses ? (
                            responses.length > 0 ? (
                                <div className="space-y-4">
                                    {responses.map((response) => (
                                        <div key={response.id} className="flex items-center space-x-2">
                                            <Label
                                                className={`flex-grow p-2 border rounded ${
                                                    response.iscorrect ? 'bg-green-100 border-green-500' : 'bg-gray-100'
                                                }`}
                                            >
                                                {response.content}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>No responses assigned yet</div>
                            )
                        ) : null}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>
                            <span>{currentQuestionIndex + 1} / {questions.length}</span>
                            <Button
                                variant="outline"
                                onClick={handleNext}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Next
                            </Button>
                        </div>
                        <Button
                            onClick={toggleResponses}
                            variant="outline"
                        >
                            {showResponses ? 'Hide Responses' : 'Show Responses'}
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

export default QA_Card;