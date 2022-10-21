import { useEffect, useState } from "react";
import { UserApi } from "../../pages/api/user";

export function CreatorCell({ uid }: { uid: string }) {
  const [data, setData] = useState<UserApi>();

  useEffect(() => {
    fetch(
      "/api/user?" +
        new URLSearchParams({
          uid,
        })
    )
      .then((data) => data.json())
      .then((data: UserApi) => setData(data));
  }, [uid]);

  return <div>{data?.full_name}</div>;
}
