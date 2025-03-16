import type { User } from "@supabase/supabase-js";
import { atom } from "nanostores";

export interface UserStore {
	user: User | null;
	isPending: boolean;
}

export const userStore = atom<UserStore>({
	user: null,
	isPending: false,
});
