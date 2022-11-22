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
    <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-24 md:flex-row">
      {tabs.map((tab, i) => (
        <Tab key={i} tab={tab} />
      ))}
    </div>
  );
}

export function Tab({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center text-slate-300 font-stretch leading-[1.125] tracking-[-0.06rem] space-y-1 md:space-y-3">
      <div className="text-2xl font-medium md:text-4xl">{tab.title}</div>
      <div className="text-lg md:text-xl min-h-[1ch]">{tab.text}</div>
    </div>
  );
}
