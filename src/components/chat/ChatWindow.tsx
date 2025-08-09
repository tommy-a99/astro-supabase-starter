import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import ExampleQuestions from "./ExampleQuestions";

interface Translations {
	welcomeMessage: string;
	example1: string;
	example2: string;
	inputPlaceholder: string;
}

interface ChatWindowProps {
	translations: Translations;
}

function ChatWindow({ translations }: ChatWindowProps) {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		initialMessages: [
			{
				id: "0",
				role: "assistant",
				content: translations.welcomeMessage,
			},
		],
	});
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [showExamples, setShowExamples] = useState(true);

	const isMobile =
		typeof window !== "undefined" &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleExampleClick = (question: string) => {
		handleInputChange({
			target: { value: question },
		} as React.ChangeEvent<HTMLInputElement>);
		const inputElement = document.querySelector(
			"[contenteditable=true]",
		) as HTMLDivElement;
		if (inputElement) {
			inputElement.focus();
		}
	};

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setShowExamples(false);
		handleSubmit(e);
	};

	return (
		<div className="flex flex-col h-screen items-center">
			{/* Chatting messages area */}
			<div className="flex-grow py-2 overflow-y-auto w-11/12 max-w-240">
				{messages.map((m) => (
					<div
						key={m.id}
						className={`flex ${
							m.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<pre
							className={
								"mb-2 p-3 rounded-md text-card-foreground bg-card whitespace-pre-wrap break-words max-w-full sm:max-w-[80%]"
							}
						>
							{m.content}
						</pre>
					</div>
				))}
				{showExamples && (
					<ExampleQuestions
						examples={[translations.example1, translations.example2]}
						onQuestionClick={handleExampleClick}
					/>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input area */}
			<div className="self-center bg-card p-4 w-11/12 mb-4 max-w-240 rounded-lg">
				<form onSubmit={onFormSubmit} className="flex items-end gap-2">
					<div
						contentEditable="true"
						className="flex-grow rounded-md py-2 px-3 focus:outline-none h-auto max-h-48 overflow-y-auto whitespace-pre-wrap break-words"
						data-placeholder={translations.inputPlaceholder}
						onInput={(e) =>
							handleInputChange({
								target: { value: e.currentTarget.textContent ?? "" },
							} as React.ChangeEvent<HTMLInputElement>)
						}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey && !isMobile) {
								e.preventDefault();
								onFormSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
							}
						}}
					>
						{input}
					</div>
					<Button
						type="submit"
						className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex-shrink-0"
					>
						<Send />
					</Button>
				</form>
			</div>
		</div>
	);
}

export default ChatWindow;
