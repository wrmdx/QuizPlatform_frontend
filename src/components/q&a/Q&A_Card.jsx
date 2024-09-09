import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteQuestionSheet } from "@/components/q&a/DeleteQuestionSheet.jsx";
import {ResponseSection} from "@/components/q&a/ResponseSection.jsx";
import {Pagination} from "@/components/my_ui/Pagination.jsx";
import { Checkbox } from "@/components/ui/checkbox"

export function QA_Card({ data, onPaginationChange, pagination  , selectedQuestions, onQuestionSelect}) {

    const [showResponses, setShowResponses] = useState({});
    const toggleResponses = (questionId) => {
        setShowResponses((prevState) => ({
            ...prevState,
            [questionId]: !prevState[questionId],
        }));
    };

    if (!data?.data?.length) return <div>No questions found.</div>;

    return (
        <>
            {data.data.map((question) => (
                <Card key={question.id} className="w-auto mb-4">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Question {question.id}</span>
                            <div className="flex items-center space-x-4">
                                {selectedQuestions && onQuestionSelect && (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={selectedQuestions.includes(question.id)}
                                            onCheckedChange={() => onQuestionSelect(question.id)}
                                        />
                                        {/*<label*/}
                                        {/*    htmlFor="terms"*/}
                                        {/*    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"*/}
                                        {/*>*/}
                                        {/*    {text}*/}
                                        {/*</label>*/}
                                    </div>
                                )}
                                <DeleteQuestionSheet id={question.id}/>
                            </div>
                        </CardTitle>
                        <CardDescription>Type: {question.type}</CardDescription>
                        <CardDescription>Duration: {question.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {question.description}
                    </CardContent>
                    <CardContent>
                        {showResponses[question.id] && (
                            <ResponseSection questionId={question.id}/>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <Button onClick={() => toggleResponses(question.id)} variant="outline">
                            {showResponses[question.id] ? 'Hide Responses' : 'Show Responses'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                />
            </div>
        </>
    );
}

export default QA_Card;