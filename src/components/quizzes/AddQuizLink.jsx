import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "@/features/auth/authSlice.jsx";

export function AddQuizLink() {
    const role = useSelector(selectCurrentRole);
    return (
        <Link to={`/${role}/quizzes/add`}>
            <Button variant="outline" className="mr-4">
                <Plus className="h-4 w-4" />
                Add Quiz
            </Button>
        </Link>
    );
}
