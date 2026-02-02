import React from "react";

export type HistoryItemProps = {
  title: string;
  year?: string | number;
  description?: string;
};

export const HistoryItem: React.FC<HistoryItemProps> = ({ title, year, description }) => {
  return (
    <div className="bg-black/60 p-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{title}</h1>
        {year && <span className="text-white/60">{year}</span>}
      </div>
      {description && <p className="text-white/70 mt-2">{description}</p>}
    </div>
  );
};

export default HistoryItem;
