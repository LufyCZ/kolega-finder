import classNames from "classnames";
import React, { useState } from "react";
import ReactDropdown from "react-dropdown";

interface Dropdown {
  entries: string[];
  selectedEntry: string;
  setEntry(entry: string): void;
}

export function Dropdown({ entries, selectedEntry, setEntry }: Dropdown) {
  const [isOpen, setOpen] = useState<boolean>();

  return (
    <div>
      <ReactDropdown
        options={entries
          .filter((entry) => entry !== selectedEntry)
          .sort((a, b) => a.localeCompare(b))}
        onChange={(option) => setEntry(option.value)}
        value={selectedEntry}
        className={classNames(
          "text-slate-200 bg-slate-900 [&:not(.is-open)]:rounded-xl rounded-t-xl"
        )}
        controlClassName="p-2"
        menuClassName="bg-slate-900 rounded-b-xl [&>*:hover]:font-medium"
        arrowClosed={<div></div>}
        arrowOpen={<span className="arrow-open" />}
        onFocus={(bool) => setOpen(!bool)}
      />
    </div>
  );
}
