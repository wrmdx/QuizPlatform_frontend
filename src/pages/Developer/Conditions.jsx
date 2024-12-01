import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Conditions() {
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        if (accepted) {
            navigate('/dev/test');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-xl font-bold mb-4 text-center">Terms and Conditions</h1>
                <div className="flex-1 items-start mb-4 space-y-4">
                    <div>
                        <Label htmlFor="copy" className="mt-1 text-gray-700">
                            I acknowledge that copying and altering tabs or windows during the quiz may result in an unfair advantage and could lead to disqualification. I commit to taking the quiz honestly and independently, adhering to all provided guidelines and instructions.
                        </Label>
                    </div>
                    <Checkbox
                        id="terms"
                        checked={accepted}
                        onCheckedChange={(checked) => setAccepted(checked)}
                        className="mr-2"
                    />
                    <Label htmlFor="copy" className="font-semibold">
                        Accept terms and conditions
                    </Label>
                </div>
                <Button
                    onClick={handleAccept}
                    disabled={!accepted}
                    className={`mt-4 w-full ${accepted ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
                >
                    Start Quiz
                </Button>
            </div>
        </div>
    );
}
