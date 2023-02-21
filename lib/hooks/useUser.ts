import useSWR from "swr";
import { UserApi } from "../../pages/api/user";

export function useUser(userId?: string) {
  return useSWR<UserApi>(userId ? `/api/user?userId=${userId}` : null, (url) =>
    fetch(url).then((data) => data.json())
  );
}
