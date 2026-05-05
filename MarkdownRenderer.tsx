import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A very basic markdown renderer for the specific output we expect from the prompt
// Handles bolding and paragraphs.
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderText = (text: string) => {
    // Split by paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((para, index) => {
      // Handle bold text **text**
      const parts = para.split(/(\*\*.*?\*\*)/g);
      
      return (
        <p key={index} className="mb-4 leading-relaxed text-white/90">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-mystic-gold font-semibold">{part.slice(2, -2)}</strong>;
            }
            // Handle single newlines within a paragraph
            return part.split('\n').map((line, j, arr) => (
              <React.Fragment key={`${i}-${j}`}>
                {line}
                {j < arr.length - 1 && <br />}
              </React.Fragment>
            ));
          })}
        </p>
      );
    });
  };

  return <div className="prose prose-invert max-w-none">{renderText(content)}</div>;
};

export default MarkdownRenderer;
