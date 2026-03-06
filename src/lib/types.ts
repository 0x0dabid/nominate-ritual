import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      discordId?: string;
      username?: string;
      avatar?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discordId?: string;
    username?: string;
    avatar?: string;
    accessToken?: string;
  }
}
