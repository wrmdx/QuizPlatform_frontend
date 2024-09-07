import Spinner from "@/components/ui/Spinner.jsx";
import { DataTable } from "@/components/users/dataTable.jsx";
import {columns} from "@/constants/quizzes/columns.jsx"
import {useGetQuizzesQuery} from "@/features/quizzes/quizzesApiSlice.jsx";
import {AddQuizLink} from "@/components/quizzes/AddQuizLink.jsx";
import {TitleFilter} from '@/components/quizzes/TitleFilter.jsx'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useGetSkillsQuery} from "@/features/skills/skillsApiSlice.jsx";
import {useGetDifficultiesQuery} from "@/features/difficulty/difficultiesApiSlice.jsx";


const Quiz = () => {

    const { data: difficulties = [] } = useGetDifficultiesQuery();
    const { data: skills = []} = useGetSkillsQuery();

    const { data: quizzes, isLoading: quizzesLoading, isError: quizzesError, isSuccess: quizzesSuccess } = useGetQuizzesQuery();


    const initialPagination = { pageIndex: 0, pageSize: 6 };
    const filters = {
        title: (props) => <TitleFilter {...props} />,
        difficulty: ({ filterValue, setFilterValue }) => (
            <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                    {difficulties.map(difficulty =>(
                        <SelectItem key={difficulty.id} value={difficulty.name}>
                            {difficulty.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ),
        skill: ({ filterValue, setFilterValue }) => (
            <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                    {skills.map(skill => (
                        <SelectItem key={skill.id} value={skill.name}>
                            {skill.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ),
    };

    if(quizzesSuccess){
        console.log("Fetching quizzes from query done")
    }
    if (quizzesLoading) return (
        <div className="flex w-screen justify-center items-center">
            <Spinner />
        </div>
    );

    if (quizzesError) return <div className="text-red-500">Failed to load quizzes.</div>;

    return (
        <div className="w-screen p-4">
            <DataTable
                columns={columns}
                data={quizzes}
                pagination={initialPagination}
                topRightComponent={<AddQuizLink/>}
                filters={filters}
            />
        </div>
    );
};

export default Quiz;
