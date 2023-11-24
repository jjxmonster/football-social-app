import { authorizeUser } from "@/app/actions";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const res = await authorizeUser(credentials);

				if (!res) return null;

				const { userData, token } = res;

				return {
					...userData,
					accessToken: token,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }: { token: JWT; session: Session }) {
			session.accessToken = token.accessToken as string;

			return session;
		},
	},
	session: { strategy: "jwt" },
	secret: process.env.AUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
