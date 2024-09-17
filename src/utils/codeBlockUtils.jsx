import { CodeBlock } from "react-code-block";

function CodeBlockDemo({ code, language }) {
    return (
        <CodeBlock code={code} language={language}>
            <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="table-row">
                    <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none"/>
                    <CodeBlock.LineContent className="table-cell">
                        <CodeBlock.Token/>
                    </CodeBlock.LineContent>
                </div>
            </CodeBlock.Code>
        </CodeBlock>
    );
}

export function renderDescription(description) {
    const codeRegex = /\/\*code\{(\w+)\}\s*([\s\S]*?)\s*code\*\//g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(description)) !== null) {
        if (match.index > lastIndex) {
            parts.push(description.slice(lastIndex, match.index));
        }
        const [, language, code] = match;
        parts.push(<CodeBlockDemo key={match.index} code={code.trim()} language={language} />);
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < description.length) {
        parts.push(description.slice(lastIndex));
    }
    return parts;
}

export default CodeBlockDemo;
