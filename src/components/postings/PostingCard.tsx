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

	return (
		<Card>
			<CardContent className="whitespace-pre-wrap">{props.content}</CardContent>
			<CardFooter className="flex gap-2 items-end">
				<div>{props.user.username}</div>
				<div className="text-xs opacity-80">
					on{" "}
					{`${insertedDate.getFullYear()}-${insertedDate.getMonth()}-${insertedDate.getDate()}`}
				</div>
			</CardFooter>
		</Card>
	);
};

export default PostingCard;
