"use server";

/*import { signIn } from "@/app/api/auth/[...nextauth]";*/
import signIn from "next-auth/react";

export const handleLoginClick = async () => {
    await signIn("spotify");
};