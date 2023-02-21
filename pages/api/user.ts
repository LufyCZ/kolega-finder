import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../lib/database.types";

export type UserApi = {
  userId: string;
  fullName: string;
  avatarUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserApi | string>
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600"
  );

  const userId = req.query.userId as string;

  if (!process.env.SUPABASE_SERVICE_KEY) {
    res.status(500).send("Service key not defined");
    return;
  }
  const client = createClient<Database>(
    "https://kbayyyxtkekjjobhzoyk.supabase.co",
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await client.auth.admin.getUserById(userId);
  if (error) {
    res.status(500).send(error.message);
    return;
  }

  const { full_name, avatar_url } = data.user.user_metadata;
  if (!full_name || !avatar_url) {
    res.status(500).send("Name or avatar undefined");
    return;
  }

  res.status(200).json({ userId, fullName: full_name, avatarUrl: avatar_url });
}
