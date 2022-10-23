import type { NextPage } from "next";
import Head from "next/head";
import { CreateButton } from "../components/Lectures/CreateButton";
import { LectureTable } from "../components/Lectures/LectureTable";
import { Tooltip } from "../components/Tooltip";

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
