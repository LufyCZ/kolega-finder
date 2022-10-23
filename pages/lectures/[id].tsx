import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { D105 } from "../../components/Rooms/config";
import { Room } from "../../components/Rooms/Room";
import { Database, RowEntry } from "../../lib";

function Lecture() {
  const [lecture, setLecture] = useState<RowEntry<"lecture">>();
  const [lectureSeats, setLectureSeats] =
    useState<RowEntry<"lectureSeats">[]>();

  const router = useRouter();
  const lectureId = Number(router.query.id as string);

  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    supabase
      .from("lecture")
      .select("*")
      .eq("id", lectureId)
      .then(({ data }) => (data ? setLecture(data[0]) : {}));

    supabase
      .from("lectureSeats")
      .select("*")
      .eq("lecture", lectureId)
      .then(({ data }) => (data ? setLectureSeats(data) : {}));
  }, [lectureId, supabase]);

  if (!lectureId) return <></>;

  return (
    <div className="pb-2 overflow-x-auto">
      <Room room={D105} lectureId={lectureId} />
    </div>
  );
}

export default Lecture;
