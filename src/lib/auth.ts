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
      if (!account?.access_token) return false;

      // Check if user is a member of the required guild
      try {
        const res = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        if (!res.ok) return false;

        const guilds = await res.json();
        const isMember = guilds.some(
          (guild: { id: string }) => guild.id === DISCORD_GUILD_ID
        );

        if (!isMember) {
          return "/auth/error?error=not_member";
        }

        return true;
      } catch {
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
  pages: {
    error: "/auth/error",
  },
};
