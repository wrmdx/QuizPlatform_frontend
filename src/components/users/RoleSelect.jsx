import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";


export function RoleSelect({value , onChange}) {

    const handleValueChange = (newValue) => {
        onChange(newValue);
    };
return(
    <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role"/>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="dev">Dev</SelectItem>
        </SelectContent>
    </Select>

);
}