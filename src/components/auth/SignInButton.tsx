import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/Popover.tsx";
import {Button} from "@/components/ui/Button.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Label} from "@/components/ui/Label.tsx";
import {useState} from "react";
import {supabase} from "@/utils/database.ts";

const SignInButton = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        if(!supabase) {
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            alert("Signed in successfully!");
        }
    };

    const handleSignUp = async () => {
        if(!supabase) {
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message);
        } else {
            alert("Sign up successful! Please check your email to confirm your account.");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Sign In</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <h4 className="font-medium leading-none text-lg">Sign In or Sign Up</h4>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600 text-white">Sign In</Button>
                        <Button onClick={handleSignUp} className="bg-green-500 hover:bg-green-600 text-white">Sign Up</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SignInButton;