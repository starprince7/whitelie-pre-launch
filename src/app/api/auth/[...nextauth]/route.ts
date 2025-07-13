import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare as bcryptCompare } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Credentials: ', credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        console.log("Connecting to database...")
        try {
          await connectToDatabase();
          console.log('Db connected')

          // Print the query we're about to run for debugging
          console.log('Running query for email:', credentials.email.toLowerCase());

          // Add timeout to prevent hanging queries
          const user = await User.findOne({ email: credentials.email.toLowerCase() })

          console.log('User query completed');

          if (!user) {
            console.log('No user found with email:', credentials.email);
            return null;
          }

          console.log('User found:', user.email);

          // Compare the provided password with the hashed password in the database
          const isPasswordValid = await bcryptCompare(credentials.password, user.hashedPassword);

          console.log('Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('Invalid password');
            return null;
          }

          // Return the user object without the password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }

        // This block is now handled inside the try/catch above
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
