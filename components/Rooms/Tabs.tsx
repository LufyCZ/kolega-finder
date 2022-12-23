import React from "react";

interface Tab {
  title: string;
  text?: string;
}

interface Tabs {
  tabs: Tab[];
}

export function Tabs({ tabs }: Tabs) {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-4 md:gap-y-0 md:gap-x-24">
      {tabs.map((tab, i) => (
        <Tab key={i} tab={tab} />
      ))}
    </div>
  );
}

export function Tab({ tab }: { tab: Tab }) {
  return (
    <div className="grid grid-rows-2 text-slate-300 font-stretch leading-[1.125] tracking-[-0.06rem] gap-y-1 md:gap-y-3">
      <div className="text-2xl font-medium md:text-4xl">{tab.title}</div>
      <div className="flex justify-center text-lg md:text-xl">{tab.text}</div>
    </div>
  );
}
