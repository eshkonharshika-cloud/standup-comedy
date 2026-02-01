import { HistoryContract, History } from "@standup/contracts";

export function mapHistoryEntry(entry: any): History {
  const mapped = {
    id: entry.sys.id,
    year: Number(entry.fields.year),
    title: entry.fields.title,
    description: entry.fields.description,
  };

  return HistoryContract.parse(mapped);
}
