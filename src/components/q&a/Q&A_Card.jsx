import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteQuestionSheet } from "@/components/q&a/DeleteQuestionSheet.jsx";
import {ResponseSection} from "@/components/q&a/ResponseSection.jsx";
import {Pagination} from "@/components/my_ui/Pagination.jsx";
import { Checkbox } from "@/components/ui/checkbox"
import {CodeBlock} from "react-code-block";



function CodeBlockDemo({ code , language}) {
    return (
        <CodeBlock code={code} language={language}>
            <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="table-row">
                    <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none"/>
                    <CodeBlock.LineContent className="table-cell">
                        <CodeBlock.Token/>
                    </CodeBlock.LineContent>
                </div>
            </CodeBlock.Code>
        </CodeBlock>
    );
}


export function QA_Card({
                            data,
                            onPaginationChange,
                            pagination,
                            selectedQuestions,
                            onQuestionSelect,
                            canDelete,
                            canPaginate
                        }) {

    const [showResponses, setShowResponses] = useState({});
    const toggleResponses = (questionId) => {
        setShowResponses((prevState) => ({
            ...prevState,
            [questionId]: !prevState[questionId],
        }));
    };
    const renderDescription = (description) => {
        const codeRegex = /\/\*code\{(\w+)\}\s*([\s\S]*?)\s*code\*\//g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeRegex.exec(description)) !== null) {
            if (match.index > lastIndex) {
                parts.push(description.slice(lastIndex, match.index));
            }
            const [, language, code] = match;
            parts.push(<CodeBlockDemo key={match.index} code={code.trim()} language={language} />);
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < description.length) {
            parts.push(description.slice(lastIndex));
        }
        return parts;
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
                                    </div>
                                )}
                                {canDelete &&
                                <DeleteQuestionSheet id={question.id}/>
                                }
                            </div>
                        </CardTitle>
                        <CardDescription>Type: {question.type}</CardDescription>
                        <CardDescription>Duration: {question.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderDescription(question.description)}
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
            {canPaginate &&
            <div className="flex items-center justify-end mt-4">
                <Pagination
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                />
            </div>
            }
        </>
    );
}

export default QA_Card;