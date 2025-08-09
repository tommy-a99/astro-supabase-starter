import { useStore } from "@nanostores/react";
import { Send } from "lucide-react";
import type React from "react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button.tsx";
import { Textarea } from "@/components/ui/Textarea.tsx";
import { userStore } from "@/store/auth/userStore.ts";
import { supabase } from "@/utils/database.ts";

const PostingInput = () => {
	const [content, setContent] = useState("");
	const [error, setError] = useState<string | null>(null);
	const $userStore = useStore(userStore);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		startTransition(async () => {
			if (!supabase) {
				return;
			}

			// Form validation
			if (!content.trim()) {
				startTransition(() => setError("Post content cannot be empty"));
				return;
			}

			// Check if user is authenticated
			if (!$userStore.user) {
				startTransition(() =>
					setError("You must be logged in to submit a post"),
				);
				return;
			}

			try {
				// Insert the new post into the postings table
				const { error: insertError } = await supabase
					.from("postings")
					.insert([
						{
							content: content.trim(),
							user_id: $userStore.user.id,
						},
					])
					.select();

				if (insertError) {
					throw insertError;
				}

				// Clear the form and show success message
				startTransition(() => setContent(""));
			} catch (err) {
				console.error("Error submitting post:", err);
				startTransition(() =>
					setError("Failed to submit post. Please try again."),
				);
			}
		});
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			className="bg-card text-card-foreground rounded-md shadow-sm w-100% p-2 xl:p-4 flex gap-2 items-end"
		>
			<Textarea
				value={content}
				required
				name="content"
				placeholder="Enter content"
				onChange={(e) => setContent(e.target.value)}
				className="resize-none"
			/>
			{isPending ? (
				<Button disabled>
					<Send />
				</Button>
			) : (
				<Button type="submit" className="rounded-xl">
					<Send />
				</Button>
			)}

			{error && (
				<div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
			)}
		</form>
	);
};

export default PostingInput;
