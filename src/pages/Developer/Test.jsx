import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
    setCurrentQuestionIndex,
    setSelectedAnswer,
    decrementTimeLeft,
    endQuiz
} from '@/features/quizzes/quizSlice';
import { logOut } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { renderDescription } from "@/utils/codeBlockUtils.jsx";
import { Checkbox } from "@/components/ui/checkbox"

const Test = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate()
    const quizState = useSelector(state => state.quiz);
    const {
        questions,
        currentQuestionIndex,
        selectedAnswers,
        timeLeft,
    } = quizState;

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(decrementTimeLeft());
        }, 1000);

        return () => {
            console.log('Clearing timer');
            clearInterval(timer);
        };
    }, [dispatch, questions]);

    useEffect(() => {
        if (timeLeft <= 0) {
            moveToNextQuestion();
        }
    }, [timeLeft]);

    useEffect(() => {
        const preventCopy = (e) => {
            e.preventDefault();
            toast({
                title: "Action Not Allowed",
                description: "Copying content is not allowed during the quiz.",
                variant: "destructive",
            });
        };

        document.addEventListener('copy', preventCopy);
        document.addEventListener('cut', preventCopy);

        return () => {
            document.removeEventListener('copy', preventCopy);
            document.removeEventListener('cut', preventCopy);
        };
    }, [toast]);
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                dispatch(endQuiz());
                toast({
                    title: "Quiz Ended",
                    description: "Switching tabs or windows is not allowed during the quiz.",
                    variant: "destructive",
                });
                dispatch(logOut());
                navigate('/end-quiz');
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [dispatch, navigate, toast]);

    const moveToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
            finishQuiz();
        }
    };

    const handleAnswerSelection = (answerId) => {
        const currentAnswers = selectedAnswers[currentQuestionIndex] || [];

        if (currentQuestion.question.type === 'qcu') {
            dispatch(setSelectedAnswer([answerId]));
        } else { // QCM
            if (currentAnswers.includes(answerId)) {
                dispatch(setSelectedAnswer(currentAnswers.filter(id => id !== answerId)));
            } else {
                dispatch(setSelectedAnswer([...currentAnswers, answerId]));
            }
        }
    };

    const finishQuiz = () => {
        const responses = questions.map((question, index) => ({
            question_id: question.id,
            response_id: selectedAnswers[index]?.[0] || null, // For single-choice
        })).filter(response => response.response_id !== null);

        const quizData = {
            quiz_id: 501,
            responses,
        };

        console.log("Submitting data:", quizData);

        dispatch(endQuiz());
        toast({
            title: "Quiz Completed",
            description: "Your answers have been submitted.",
        });
        dispatch(logOut());
        navigate('/end-quiz');
    };


    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container mx-auto p-4 w-screen">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            <div className="mb-4">
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p>Time left: {timeLeft} seconds</p>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl mb-4">{renderDescription(currentQuestion.question.description)}</h2>

                {currentQuestion.question.type === 'qcu' ? (
                    <RadioGroup
                        onValueChange={(value) => handleAnswerSelection(value)}
                        value={selectedAnswers[currentQuestionIndex]?.[0] || ''}
                    >
                        {currentQuestion.responses.map((response) => (
                            <div key={response.id} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value={response.id} id={`response-${response.id}`} />
                                <Label htmlFor={`response-${response.id}`}>{renderDescription(response.description)}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    currentQuestion.responses.map((response) => (
                        <div key={response.id} className="flex items-center space-x-2 mb-2">
                            <Checkbox
                                id={`response-${response.id}`}
                                checked={selectedAnswers[currentQuestionIndex]?.includes(response.id)}
                                onCheckedChange={() => handleAnswerSelection(response.id)}
                            />
                            <Label htmlFor={`response-${response.id}`}>{renderDescription(response.description)}</Label>
                        </div>
                    ))
                )}
            </div>
            <Button onClick={moveToNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
        </div>
    );
};

export default Test;