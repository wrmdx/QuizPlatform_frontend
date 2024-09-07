import { Input } from '@/components/ui/input.jsx';

export function EmailFilter({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <Input
            placeholder="Filter emails..."
            value={value}
            onChange={handleChange}
            className="max-w-sm"
            type="text"
        />
    );
}