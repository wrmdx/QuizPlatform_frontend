import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";

const QuestionsButton = ({ action, path, quizId , quizTitle}) => {
    return (
        <Link to={`${path}/${quizId}`} state={{ quizTitle }}>
            <Button variant="ghost" className="text-blue-500 hover:text-white hover:bg-blue-500">
                {action} Questions
            </Button>
        </Link>
    );
};

export default QuestionsButton;
