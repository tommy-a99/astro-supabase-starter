import { Button } from "@/components/ui/Button.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover.tsx";
import { userStore } from "@/store/auth/userStore.ts";
import { supabase } from "@/utils/database.ts";
import { useStore } from "@nanostores/react";

const SignedInButton = () => {
	const $userStore = useStore(userStore);

	const handleSignOut = async () => {
		await supabase?.auth.signOut();
		location.reload();
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm">
					{$userStore.user?.email}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-40">
				<div className="flex item-center justify-center">
					<Button
						className="bg-card-background text-card-foreground border border-solid border-card-foreground"
						onClick={handleSignOut}
					>
						Sign Out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default SignedInButton;
