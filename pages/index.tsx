import type { NextPage } from "next";
import { CreateButton } from "../components/Lectures/CreateButton";
import { LectureTable } from "../components/Lectures/LectureTable";

const Home: NextPage = () => {
  return (
    <div className="max-w-3xl m-auto space-y-4">
      <div className="flex justify-end">
        <CreateButton />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-fit">
          <LectureTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
