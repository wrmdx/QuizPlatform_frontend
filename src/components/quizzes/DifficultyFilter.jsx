import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useGetDifficultiesQuery} from "@/features/difficulty/difficultiesApiSlice.jsx";

export function DifficultyFilter({ value, onChange }) {
    const { data: difficulties = [] } = useGetDifficultiesQuery();
    const handleValueChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <Select value={value} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select difficulty"/>
            </SelectTrigger>
            <SelectContent>
                {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.id} value={difficulty.name}>
                        {difficulty.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}