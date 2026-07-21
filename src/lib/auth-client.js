import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // In Next.js client side, variables must have NEXT_PUBLIC_
});

export const { signIn, signUp, signOut, useSession } = authClient; 



