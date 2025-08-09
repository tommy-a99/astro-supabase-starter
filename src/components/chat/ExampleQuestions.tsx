import React from "react";
import { Button } from "../ui/Button";

interface ExampleQuestionsProps {
  examples: string[];
  onQuestionClick: (question: string) => void;
}

const ExampleQuestions: React.FC<ExampleQuestionsProps> = ({
  examples,
  onQuestionClick,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <p className="text-sm text-gray-500">Or try one of these examples:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(example)}
            className="bg-white/50 backdrop-blur-sm"
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExampleQuestions;
