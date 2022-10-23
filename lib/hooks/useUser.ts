import { useEffect, useState } from "react";
import { UserApi } from "../../pages/api/user";

export function useUser(user_id: string) {
  const [user, setUser] = useState<UserApi>();

  useEffect(() => {
    fetch(
      "/api/user?" +
        new URLSearchParams({
          user_id,
        })
    )
      .then((data) => data.json())
      .then((data: UserApi) => setUser(data));
  }, [user_id]);

  return user;
}
