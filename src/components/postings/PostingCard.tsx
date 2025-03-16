import { Card, CardContent, CardFooter } from "@/components/ui/Card.tsx";
import type { Database } from "../../../supabase/types.ts";

export interface PostingCardProps {
	id: number;
	content: string;
	user: Database["public"]["Tables"]["users"]["Row"];
	insertedAt: string;
}

const PostingCard = (props: PostingCardProps) => {
	return (
		<Card>
			<CardContent>{props.content}</CardContent>
			<CardFooter className="flex justify-between">
				{props.user.username} on {props.insertedAt}
			</CardFooter>
		</Card>
	);
};

export default PostingCard;
