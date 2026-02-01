import { QuoteContract, Quote } from "@standup/contracts/quote";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export function mapQuoteEntry(entry: any): Quote {
  const mapped = {
    id: entry.sys.id,
    quote: documentToPlainTextString(entry.fields.quote),
    author: documentToPlainTextString(entry.fields.author),
  };

  return QuoteContract.parse(mapped);
}
