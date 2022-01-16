import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";

export default NextAuth({

    // Login

    providers: [
        
        // Credential property: email, password

        CredentialsProvider({
            
            name: "email-password-credential",
            
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials: Record<any, any>, req: NextApiRequest){
                return credentials;
            }
        })
    ],
})