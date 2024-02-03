"use server";

import { signIn } from "@/app/api/auth/[...nextauth]";

const handleLoginClick = async () => {
    await signIn("spotify");
};