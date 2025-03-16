import React, {useEffect, useState, useTransition} from 'react';
import {supabase} from "@/utils/database.ts";
import PostingCard, {type PostingCardProps} from "@/components/postings/PostingCard.tsx";
import PostingInput from "@/components/postings/PostingInput.tsx";

const PostingsList = () => {
    const [postings, setPostings] = useState<PostingCardProps[]>([]);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostings = async () => {
            if (!supabase) {
                return;
            }

            try {
                const {data, error} = await supabase
                    .from("postings")
                    .select("id, content, inserted_at, users!user_id (*)")
                    .order("inserted_at", {ascending: false});

                if (error) {
                    throw error;
                }

                startTransition(() => setPostings(data.map(d => ({
                    id: d.id,
                    content: d.content,
                    username: d.users.username ?? '',
                    insertedAt: d.inserted_at,
                })) || []));
            } catch (err) {
                console.error("Error fetching postings:", err);
                startTransition(() => setError("Failed to fetch postings"));
            }
        };

        startTransition(() => fetchPostings());
    }, []);

    return (
        <div className="pb-14">
            <section>
                <PostingInput />
            </section>
            {isPending ? (
                <p className="text-xl">Loading postings...</p>
            ) : error ? (
                <p className="text-xl text-red-500">{error}</p>
            ) : postings.length === 0 ? (
                <p className="text-xl">No postings available.</p>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4">
                    {postings.map((post) => (
                        <article key={post.id}>
                            <PostingCard {...post} />
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostingsList;