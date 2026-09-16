import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

interface MarkdownContentProps {
  content?: string | null;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
