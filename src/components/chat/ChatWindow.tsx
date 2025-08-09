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
	const [messages, setMessages] = useState<
		{ text: string; sender: string; createdAt: string }[]
	>([]);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const messageInputRef = useRef<HTMLDivElement | null>(null);
	const [showExamples, setShowExamples] = useState(true);

	const isMobile =
		typeof window !== "undefined" &&
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	useEffect(() => {
		// Add welcome message on initial load
		setMessages([
			{
				text: translations.welcomeMessage,
				sender: "bot",
				createdAt: Date.now().toString(),
			},
		]);
	}, [translations.welcomeMessage]);

	useEffect(() => {
		if (messages[messages.length - 1]?.sender === "user") {
			scrollToBottom();
		}
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = () => {
		const newMessage = messageInputRef.current?.textContent ?? "";

		if (newMessage.trim() && messageInputRef.current) {
			setMessages([
				...messages,
				{ text: newMessage, sender: "user", createdAt: Date.now().toString() },
			]);
			messageInputRef.current.textContent = ""; // Clear the input field
			setShowExamples(false); // Hide examples after sending a message
			scrollToBottom();

			// TODO: Add your message sending logic here
			console.log("Message send:", newMessage);
		}
	};

	const handleExampleClick = (question: string) => {
		if (messageInputRef.current) {
			messageInputRef.current.textContent = question;
			messageInputRef.current.focus();
		}
	};

	return (
		<div className="flex flex-col h-screen items-center">
			{/* Chatting messages area */}
			<div className="flex-grow py-2 overflow-y-auto w-11/12 max-w-240">
				{messages.map((message) => (
					<div
						key={message.createdAt}
						className={`flex ${
							message.sender === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<pre
							className={
								"mb-2 p-3 rounded-md text-card-foreground bg-card whitespace-pre-wrap break-words max-w-full sm:max-w-[80%]"
							}
						>
							{message.text}
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
				<div className="flex items-end gap-2">
					<div
						contentEditable="true"
						className="flex-grow rounded-md py-2 px-3 focus:outline-none h-auto max-h-48 overflow-y-auto whitespace-pre-wrap break-words"
						data-placeholder={translations.inputPlaceholder}
						ref={messageInputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey && !isMobile) {
								e.preventDefault();
								handleSendMessage();
							}
						}}
					/>
					<Button
						className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex-shrink-0"
						onClick={handleSendMessage}
					>
						<Send />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChatWindow;
