import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id:{label:"id", type:"number"},
                email: { label: "email", type: "email", placeholder: "" },
                contrasena_hasheada: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // Agregar esta línea
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
                    console.log("User from backend:", user); // Agregar esta línea
                    return user;

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
            console.log("JWT Token:", token); // Agregar esta línea
            console.log("JWT User:", user); // Agregar esta línea
            if (user) {
              return { ...token, ...user, id: user.id }; // Agrega el id al token
            }
            return token;
          },
          async session({ session, token }) {
            console.log("Session:", session); // Agregar esta línea
            console.log("Session Token:", token); // Agregar esta línea
            if (token) {
              session.user = { ...token }; // Usa el token fusionado como session.user
            }
            return session;
          },
        },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST, handler as PUT };