import SignInButton from "@/components/auth/SignInButton.tsx";
import SignedInButton from "@/components/auth/SignedInButton.tsx";
import { Skeleton } from "@/components/ui/Skeleton.tsx";
import { userStore } from "@/store/auth/userStore.ts";
import { useStore } from "@nanostores/react";

const AuthButton = () => {
	const $userStore = useStore(userStore);

	return (
		<div>
			{$userStore.isPending ? (
				<Skeleton className="rounded-sm w-32 h-6" />
			) : $userStore.user ? (
				<SignedInButton />
			) : (
				<SignInButton />
			)}
		</div>
	);
};

export default AuthButton;
