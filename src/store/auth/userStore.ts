import { atom } from 'nanostores';
import type {User} from "@supabase/supabase-js";

export interface UserStore {
    user: User | null;
    isPending: boolean;
}

export const userStore = atom<UserStore>({
    user: null,
    isPending: false,
});