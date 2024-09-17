import {useGetResponsesQuery} from "@/features/responses/responsesApiSlice.jsx";
import Spinner from "@/components/ui/Spinner.jsx";
import {Label} from "@/components/ui/label.jsx";
import { renderDescription } from "@/utils/codeBlockUtils.jsx";

export function ResponseSection({ questionId }) {

    const { data: responses, isLoading, isError } = useGetResponsesQuery(questionId);

    if (isError) return <div>Error fetching responses</div>;

    return (
        <div className="space-y-4">
            {isLoading
                ?
                    <Spinner />
                :
                (!responses || responses.length === 0)
                    ?
                    ( <div>No responses assigned yet</div> )
                    :
                    (
                        <>
                            {responses.map((response) => (
                                <div key={response.id} className="flex items-center space-x-2">
                                    <Label
                                        className={`flex-grow p-2 border rounded ${
                                            response.iscorrect ? 'bg-green-100 border-green-500' : 'bg-gray-100'
                                        }`}
                                    >
                                        {renderDescription(response.content)}
                                    </Label>
                                </div>
                            ))}
                        </>
                    )}
        </div>
    );
}
