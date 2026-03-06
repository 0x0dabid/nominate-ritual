import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!;

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      console.log("[AUTH] signIn callback triggered");
      if (!account?.access_token) {
        console.log("[AUTH] No access token");
        return false;
      }

      // Check if user is a member of the required guild
      try {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        console.log("[AUTH] Discord guilds API status:", res.status);
        if (!res.ok) {
          const text = await res.text();
          console.log("[AUTH] Discord API error:", text);
          return false;
        }

        const guilds = await res.json();
        console.log("[AUTH] Found guilds:", guilds.length, "Checking for:", DISCORD_GUILD_ID);
        const isMember = guilds.some(
          (guild: { id: string }) => guild.id === DISCORD_GUILD_ID
        );

        if (!isMember) {
          console.log("[AUTH] User not a member of guild");
          return "/auth/error?error=not_member";
        }

        console.log("[AUTH] User is a member, allowing sign in");
        return true;
      } catch (error) {
        console.log("[AUTH] Error during sign in:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discordId = (profile as { id: string }).id;
        token.username = (profile as { username: string }).username;
        token.avatar = (profile as { avatar: string }).avatar;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).discordId =
          token.discordId;
        (session.user as Record<string, unknown>).username = token.username;
        (session.user as Record<string, unknown>).avatar = token.avatar;
      }
      return session;
    },
  },
  debug: true,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  pages: {
    error: "/auth/error",
  },
};
