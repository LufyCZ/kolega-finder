import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../lib/database.types";

export type UserApi = {
  user_id: string;
  full_name: string;
  avatar_url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserApi | string>
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600"
  );

  const user_id = req.query.user_id as string;

  if (!process.env.SUPABASE_SERVICE_KEY) {
    res.status(500).send("Service key not defined");
    return;
  }
  const client = createClient<Database>(
    "https://kbayyyxtkekjjobhzoyk.supabase.co",
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await client.auth.admin.getUserById(user_id);
  if (error) {
    res.status(500).send(error.message);
    return;
  }

  const { full_name, avatar_url } = data.user.user_metadata;
  if (!full_name || !avatar_url) {
    res.status(500).send("Name or avatar undefined");
    return;
  }

  res.status(200).json({ user_id, full_name, avatar_url });
}
