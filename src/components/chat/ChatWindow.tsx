import { Send } from "lucide-react";
// src/components/ChatWindow.jsx
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

function ChatWindow() {
	const [messages, setMessages] = useState<
		{ text: string; sender: string; createdAt: string }[]
	>([]);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const messageInputRef = useRef<HTMLDivElement | null>(null);
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);

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
			scrollToBottom();

			// TODO: Add your message sending logic here
			console.log("Message send:", newMessage);
		}
	};

	return (
		<div className="flex flex-col h-screen items-center">
			{/* Chatting messages area */}
			<div className="flex-grow py-2 overflow-y-auto w-11/12 max-w-240">
				{messages.map((message) => (
					<pre
						key={message.createdAt}
						className={`mb-2 p-3 rounded-md text-card-foreground bg-card ${
							message.sender === "user" ? "ml-2 self-end" : "mr-2 self-start"
						}`}
					>
						{message.text}
					</pre>
				))}
				<div ref={messagesEndRef} />{" "}
				{/* This div is used to scroll to the bottom of the chat window */}
			</div>

			{/* Input area */}
			<div className="self-center bg-card p-4 w-11/12 mb-4 max-w-240 rounded-lg">
				<div className="flex items-end gap-2">
					<div
						contentEditable="true"
						className="flex-grow rounded-md py-2 px-3 focus:outline-none h-18 overflow-y-auto whitespace-pre"
						data-placeholder="Type your message..."
						ref={messageInputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey && !isMobile) {
								e.preventDefault();
								handleSendMessage();
							}
						}}
					/>
					<Button
						className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
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
