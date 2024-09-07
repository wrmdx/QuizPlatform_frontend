import { Input } from '@/components/ui/input.jsx';

export function TitleFilter({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <Input
            placeholder="Filter titles..."
            value={value}
            onChange={handleChange}
            className="max-w-sm"
            type="text"
        />
    );
}