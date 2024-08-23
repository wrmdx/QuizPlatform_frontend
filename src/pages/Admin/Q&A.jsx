import { useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import QA_Card from "@/components/q&a/Q&A_Card.jsx";
import {AddQuestionForm} from "@/components/q&a/AddQuestionForm.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export function QA() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="w-screen p-6">
            <div className="flex space-x-2">
                <Input
                    type="text"
                    placeholder="Search for questions..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border rounded"
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><AddQuestionForm/></TooltipTrigger>
                        <TooltipContent>
                            <p>Add Q&A</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <section id="qa_card" className="mt-4">
                <QA_Card searchQuery={searchQuery}/>
            </section>
        </div>
    );
}

export default QA;
