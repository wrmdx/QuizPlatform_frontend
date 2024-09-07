import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useGetSkillsQuery} from "@/features/skills/skillsApiSlice.jsx";

export function SkillFilter({ value, onChange }) {

    const { data: skills = []} = useGetSkillsQuery();
    const handleValueChange = (newValue) => {
        onChange(newValue);
    };
    return (
    <Select value={value} onValueChange={handleValueChange}>
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
    )
}