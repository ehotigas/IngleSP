import CredentialsProvider from "next-auth/providers/credentials";
import { User, UserLoginReq } from "@/types/global";
import NextAuth from "next-auth"


const secret = process.env.NEXTAUTH_SECRET
export const authOptions = {
    pages: {
        signIn: '/signin',
        signOut: '/signout'
    },
    secret: secret,
    providers: [
        CredentialsProvider(
            {
            name: "Credentials",
            credentials: {
            },
            /* @ts-expect-error */
            async authorize(
                credentials,
                req
            ) {
                const tempCredentials = credentials as UserLoginReq;
                let reqBody = JSON.stringify({
                    email: tempCredentials.email,
                    password: tempCredentials.password
                });
                const response = await Promise.resolve(
                    fetch(
                        "https://ingle-sp.vercel.app/api/user/auth",
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: reqBody
                        }
                    )
                );
                const user: User = await response.json();
                return user;
            }
        })
    ],
    callbacks: {
        async jwt(
            {
                token,
                user,
                account,
                profile,
                isNewUser
            }: any
        ) {
            return { ...token, ...user }
        },
        async session(
            {
                session,
                user,
                token
            }: any
        ) {
            session.user = token;
            return session
        }
    }
      
}

export default NextAuth(authOptions)