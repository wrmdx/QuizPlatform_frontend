import { BreadCrumb } from "@/components/quizzes/BreadCrumb.jsx";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "@/features/auth/authSlice.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import { useSearchQuestionsQuery } from "@/features/questions/questionsApiSlice.jsx";
import { useGetResponsesQuery } from "@/features/responses/responsesApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAssignQuizQuestionsMutation} from "@/features/quizzes/quizzesApiSlice.jsx";
import {useToast} from "@/components/ui/use-toast.js";

export default function Assign_QA_QuizPage() {

    const { toast } = useToast();
    const navigate = useNavigate()
    const role = useSelector(selectCurrentRole);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [searchQuestions, { data: questions = [], isLoading, isError , isSuccess }] = useSearchQuestionsQuery();
    const [assignQuizQuestions] = useAssignQuizQuestionsMutation();
    const [showResponses, setShowResponses] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
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
  }, [searchQuery, searchQuestions]);

  const handleQuestionSelection = (questionId, duration) => {
   setSelectedQuestions(prev => {
    if (questionId in prev) {
     const newState = { ...prev };
     delete newState[questionId];
     return newState;
    } else {
     return { ...prev, [questionId]: { id: questionId, duration } };
    }
   });
  };
  const handlePrevious = () => {
   setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleNext = () => {
   setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };
  const toggleResponses = () => {
   setShowResponses(!showResponses);
  };
  const handleSearchChange = (event) => {
   setSearchQuery(event.target.value);
  };
    const { quizId } = useParams();

    const handleAssignQuestions = async () => {
        try {
            const body = {
                questions: Object.values(selectedQuestions)
            };
            const result = await assignQuizQuestions({ quizId, body }).unwrap();
            toast({
                description: result.message,
            });
            navigate(-1)
        } catch (error) {
            console.error("Error assigning questions:", error);
            alert("Failed to assign questions. Please try again.");
        }
    };



  return (
      <main className="w-screen p-4">
          <div className="px-4 py-4">
              <BreadCrumb role={role} text={"Assign"}/>
          </div>
          <Input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border rounded mb-4"
          />
          {isLoading || responsesLoading ? (
              <div className="flex items-center justify-center"><p>Loading... <Spinner/></p></div>
          ) : isError || responsesError ? (
              <div className="flex items-center justify-center"><p>Error loading data</p></div>
          ) : !questions.length ? (
              <div className="flex items-center justify-center"><p>No questions found!</p></div>
          ) : currentQuestion && isSuccess ? (
              <Card className="w-auto mb-4">
                  <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                          <span>Question {currentQuestionIndex + 1}</span>
                          <div className="flex items-center space-x-2">
                              <Checkbox
                                  checked={currentQuestion.id in selectedQuestions}
                                  onCheckedChange={(checked) => {
                                      if (checked) {
                                          handleQuestionSelection(currentQuestion.id, 1);
                                      } else {
                                          handleQuestionSelection(currentQuestion.id);
                                      }
                                  }}
                              />
                              {currentQuestion.id in selectedQuestions && (
                                  <Input
                                      type="number"
                                      min="1"
                                      max="60"
                                      value={selectedQuestions[currentQuestion.id].duration}
                                      onChange={(e) => handleQuestionSelection(currentQuestion.id, parseInt(e.target.value, 10))}
                                      className="w-20"
                                  />
                              )}
                              <span>min</span>
                          </div>

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
          ) : null}
          <p className="text-sm text-gray-600">Total questions: {Object.keys(selectedQuestions).length}</p>
          <Button
              onClick={handleAssignQuestions}
              disabled={Object.keys(selectedQuestions).length === 0}
              className="mt-4"
          >
              Assign Selected Questions
          </Button>
      </main>
  );
}