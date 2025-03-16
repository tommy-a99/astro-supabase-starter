import { Card, CardContent, CardFooter } from "@/components/ui/Card.tsx";
import type { Database } from "../../../supabase/types.ts";

export interface PostingCardProps {
	id: number;
	content: string;
	user: Database["public"]["Tables"]["users"]["Row"];
	insertedAt: string;
}

const PostingCard = (props: PostingCardProps) => {
	const insertedDate = new Date(props.insertedAt);
	const today = new Date();

	return (
		<Card>
			<CardContent className="whitespace-pre-wrap">{props.content}</CardContent>
			<CardFooter className="flex gap-2 items-end">
				<div className="text-sm">{props.user.username}</div>
				<div className="text-xs opacity-80">
					at{" "}
					{insertedDate.getFullYear() === today.getFullYear() &&
					insertedDate.getMonth() === today.getMonth() &&
					insertedDate.getDate() === today.getDate()
						? `${insertedDate.getHours().toString().padStart(2, "0")}:${insertedDate.getMinutes().toString().padStart(2, "0")}`
						: `${insertedDate.getFullYear()}-${insertedDate.getMonth()}-${insertedDate.getDate()}`}
				</div>
			</CardFooter>
		</Card>
	);
};

export default PostingCard;
