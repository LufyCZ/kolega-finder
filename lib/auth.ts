import { betterAuth } from "better-auth";
import { db } from "@/lib/db";

const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;

export const auth = betterAuth({
  database: db,
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: clientId && clientSecret
    ? { discord: { clientId, clientSecret, mapProfileToUser: (profile) => ({
      email: profile.email ?? `${profile.id}@discord.placeholder.invalid`,
    }) } }
    : {},
});
