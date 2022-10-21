import type { NextPage } from "next";
import Head from "next/head";
import { CreateButton } from "../components/Lectures/CreateButton";
import { LectureTable } from "../components/Lectures/LectureTable";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <meta title="FIT Kolega Finder" />
      </Head>
      <div className="flex items-center justify-center w-full h-full">
        <div className="space-y-4">
          <div className="flex justify-end">
            <CreateButton />
          </div>
          <LectureTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
