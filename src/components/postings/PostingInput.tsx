import React, {useState, useTransition} from 'react';
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/Button.tsx";
import {Send} from "lucide-react";
import {userStore} from "@/store/auth/userStore.ts";
import {useStore} from "@nanostores/react";
import {supabase} from "@/utils/database.ts";

const PostingInput = () => {
    const [content, setContent] = useState('');
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
                startTransition(() => setError('Post content cannot be empty'));
                return;
            }

            // Check if user is authenticated
            if (!$userStore.user) {
                startTransition(() => setError('You must be logged in to submit a post'));
                return;
            }

            try {
                // Insert the new post into the postings table
                const {data, error: insertError} = await supabase
                    .from('postings')
                    .insert([
                        {
                            content: content.trim(),
                            user_id: $userStore.user.id
                        }
                    ])
                    .select();

                if (insertError) {
                    throw insertError;
                }

                // Clear the form and show success message
                startTransition(() => setContent(''));

            } catch (err) {
                console.error('Error submitting post:', err);
                startTransition(() => setError('Failed to submit post. Please try again.'));
            }
        });
    };

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <Input value={content}
                   required
                   name="content"
                   onChange={e => setContent(e.target.value)}
            />
            <Button type='submit'>
                <Send/>
            </Button>

            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
                    {error}
                </div>
            )}
        </form>
    );
};

export default PostingInput;