import React, {useEffect, useRef, useState, useTransition} from 'react';
import {supabase} from "@/utils/database.ts";
import PostingCard, {type PostingCardProps} from "@/components/postings/PostingCard.tsx";
import PostingInput from "@/components/postings/PostingInput.tsx";
import {Button} from "@/components/ui/Button.tsx";
import type {Database} from "../../../supabase/types.ts";

const PostingsList = () => {
    const [postings, setPostings] = useState<PostingCardProps[]>([]);
    const userMapRef = useRef<Map<string, Database['public']['Tables']['users']['Row']>>(new Map());
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

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

            startTransition(() => setPostings(data.map(d => {
                userMapRef.current.set(d.users.id, d.users);
                return {
                    id: d.id,
                    content: d.content,
                    user: d.users,
                    insertedAt: d.inserted_at,
                };
            }) || []));
        } catch (err) {
            console.error("Error fetching postings:", err);
            startTransition(() => setError("Failed to fetch postings"));
        }
    };

    useEffect(() => {
        if (!supabase) {
            return;
        }

        startTransition(() => fetchPostings());

        const subs = supabase
            .channel('postings')
            .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'postings'}, async (payload) => {
                if (!supabase) {
                    return;
                }

                if (!userMapRef.current.has(payload.new.user_id)) {
                    const {data, error} = await supabase
                        .from("users")
                        .select("*")
                        .eq("id", payload.new.user_id);
                    if (data?.[0]) {
                        userMapRef.current.set(data[0].id, data[0]);
                    }
                }

                const user = userMapRef.current.get(payload.new.user_id)!;
                setPostings(prev => [
                    {
                        id: payload.new.id,
                        content: payload.new.content,
                        insertedAt: payload.new.inserted_at,
                        user: user
                    },
                    ...prev
                ]);
            })
            .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'postings'}, (payload) => {
                setPostings(postings.map(p => {
                    if (p.id !== payload.new.id) {
                        return p;
                    }

                    return {
                        ...p,
                        content: payload.new.content,
                    };
                }));
            })
            .on('postgres_changes', {event: 'DELETE', schema: 'public', table: 'postings'}, payload => {
                setPostings(postings.filter(p => p.id !== payload.new.id));
            })
            .subscribe();

        return () => {
            supabase!.removeChannel(subs);
        };
    }, []);

    return (
        <div className="pb-14">
            <section>
                <PostingInput/>
            </section>
            {isPending ? (
                <p className="text-xl">Loading postings...</p>
            ) : error ? (
                <p className="text-xl text-red-500">{error}</p>
            ) : postings.length === 0 ? (
                <p className="text-xl">No postings available.</p>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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