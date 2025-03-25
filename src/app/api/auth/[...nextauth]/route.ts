import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "" },
                contrasena_hasheada: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                contrasena_hasheada: credentials?.contrasena_hasheada, // Corregido aquí
                            }),
                            headers: { "Content-Type": "application/json" },
                        }
                    );

                    if (!res.ok) {
                        const error = await res.json();
                        throw new Error(error.message || "Login failed");
                    }

                    const user = await res.json();
                    console.log(user);

                    return user;
                } catch (error) {
                    console.error("Error during login:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };