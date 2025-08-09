import { Send } from "lucide-react";
// src/components/ChatWindow.jsx
import { useEffect, useRef, useState } from "react";
import { getAIResponse } from "@/utils/mockAiResponses";
import { Button } from "../ui/Button";

function ChatWindow() {
	const [messages, setMessages] = useState<
		{ text: string; sender: "user" | "ai"; createdAt: string }[]
	>([]);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const messageInputRef = useRef<HTMLDivElement | null>(null);
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSendMessage = () => {
		const newMessage = messageInputRef.current?.textContent ?? "";

		if (newMessage.trim() && messageInputRef.current) {
			const userMessage = {
				text: newMessage,
				sender: "user" as const,
				createdAt: Date.now().toString(),
			};
			setMessages((prevMessages) => [...prevMessages, userMessage]);
			if (messageInputRef.current) {
				messageInputRef.current.textContent = ""; // Clear the input field
			}
			scrollToBottom();

			// Simulate AI response
			setTimeout(() => {
				const aiResponse = getAIResponse(newMessage);
				setMessages((prevMessages) => [
					...prevMessages,
					{
						text: aiResponse,
						sender: "ai" as const,
						createdAt: Date.now().toString(),
					},
				]);
				scrollToBottom();
			}, 1000);
		}
	};

	return (
		<div className="flex flex-col h-screen items-center bg-background">
			{/* Chatting messages area */}
			<div className="flex-grow py-2 overflow-y-auto w-full max-w-2xl px-4">
				<div className="flex flex-col gap-4">
					{messages.map((message) => (
						<div
							key={message.createdAt}
							className={`flex ${
								message.sender === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
									message.sender === "user"
										? "bg-primary text-primary-foreground"
										: "bg-card text-card-foreground"
								}`}
							>
								<p className="whitespace-pre-wrap">{message.text}</p>
							</div>
						</div>
					))}
				</div>
				<div ref={messagesEndRef} />
			</div>
			{/* Input area */}
			<div className="self-center bg-card p-4 w-full max-w-2xl rounded-t-lg shadow-lg">
				<div className="flex items-end gap-2">
					<div
						contentEditable="true"
						className="flex-grow rounded-md py-2 px-3 bg-input text-foreground focus:outline-none h-18 overflow-y-auto whitespace-pre-wrap"
						data-placeholder="Type your message..."
						ref={messageInputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey && !isMobile) {
								e.preventDefault();
								handleSendMessage();
							}
						}}
						style={{ minHeight: "40px" }}
					/>
					<Button
						className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline shrink-0"
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
