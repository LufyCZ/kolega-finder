import type { NextPage } from "next";
import { CreateButton } from "../components/Lectures/CreateButton";
import { LectureTable } from "../components/Lectures/LectureTable";

const Home: NextPage = () => {
  return (
    <div className="max-w-3xl m-auto space-y-4">
      <div className="flex justify-end">
        <CreateButton />
      </div>
      <LectureTable />
    </div>
  );
};

export default Home;
