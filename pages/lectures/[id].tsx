import { useRouter } from "next/router";
import { useMemo } from "react";
import { Room } from "../../components/Rooms/Room";
import { Tabs } from "../../components/Rooms/Tabs";
import { useLecture } from "../../lib/hooks/useLecture";
import { useLectureSeats } from "../../lib/hooks/useLectureSeats";

function Lecture() {
  const router = useRouter();
  const lectureId = Number(router.query.id as string);

  const lecture = useLecture(lectureId);
  const { data: lectureSeats } = useLectureSeats(lectureId);

  const tabs = useMemo(() => {
    return [
      {
        title: "Subject",
        text: lecture?.subject,
      },
      {
        title: "Name",
        text: lecture?.name ?? "-",
      },
      {
        title: "Kolegas",
        text: lectureSeats?.length.toString() ?? "-",
      },
    ];
  }, [lecture?.name, lecture?.subject, lectureSeats?.length]);

  if (!lectureId) return <></>;

  return (
    <div className="pb-2 space-y-2">
      <Tabs tabs={tabs} />
      <div className="scale-90 2xl:scale-100">
        <Room lectureId={lectureId} />
      </div>
    </div>
  );
}

export default Lecture;
