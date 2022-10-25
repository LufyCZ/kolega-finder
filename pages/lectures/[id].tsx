import { useRouter } from "next/router";
import { Room } from "../../components/Rooms/Room";

function Lecture() {
  const router = useRouter();
  const lectureId = Number(router.query.id as string);

  if (!lectureId) return <></>;

  return (
    <div className="pb-2 overflow-x-auto">
      <div className="scale-90 2xl:scale-100">
        <Room lectureId={lectureId} />
      </div>
    </div>
  );
}

export default Lecture;
