import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
}

/**
 * Renders the assistant's markdown.
 *
 * react-markdown builds React elements and ignores raw HTML unless rehype-raw
 * is added, which matters here: this text is model output quoting the user's
 * own notes, so a note containing a script tag must not become one.
 */
export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children: label }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
