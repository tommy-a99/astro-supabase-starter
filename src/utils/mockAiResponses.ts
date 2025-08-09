// src/utils/mockAiResponses.ts
export const getAIResponse = (message: string): string => {
	const lowerCaseMessage = message.toLowerCase();

	if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
		return "Hello there! How can I help you today?";
	}

	if (
		lowerCaseMessage.includes("how are you") ||
		lowerCaseMessage.includes("how are you doing")
	) {
		return "I'm just a bot, but I'm doing great! Thanks for asking.";
	}

	if (
		lowerCaseMessage.includes("help") ||
		lowerCaseMessage.includes("support")
	) {
		return "Sure, I can help. What do you need assistance with?";
	}

	if (
		lowerCaseMessage.includes("bye") ||
		lowerCaseMessage.includes("goodbye")
	) {
		return "Goodbye! Have a great day!";
	}

	// Default response
	return "I'm not sure how to respond to that. Can you ask me something else?";
};
