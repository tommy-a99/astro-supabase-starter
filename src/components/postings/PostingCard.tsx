import {Card, CardContent, CardFooter} from "@/components/ui/Card.tsx";

export interface PostingCardProps {
    id: number;
    content: string;
    username: string;
    insertedAt: string;
}

const PostingCard = (props: PostingCardProps) => {

    return (
        <Card>
            <CardContent>
                {props.content}
            </CardContent>
            <CardFooter className="flex justify-between">
                {props.username} on {props.insertedAt}
            </CardFooter>
        </Card>
    );
};

export default PostingCard;