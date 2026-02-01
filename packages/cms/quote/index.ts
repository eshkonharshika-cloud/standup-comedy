import { graphql } from "../contentful/client";
import { mapQuoteEntry } from "../mappers/quote.mapper";

export async function getQuote() {
  // GraphQL query for Contentful: fetch the first quote entry
  const QUERY = `
    query GetIntroQuote($limit: Int) {
      quoteCollection(limit: $limit) {
        items {
          sys { id }
          quote { json }
          author { json }
        }
      }
    }
  `;

  const data = await graphql<{ quoteCollection: { items: any[] } }>(QUERY, { limit: 1 });

  const item = data?.quoteCollection?.items?.[0];
  if (!item) throw new Error("No quote entry found via GraphQL");

  // DEBUG: inspect GraphQL item shape
  console.log("[getQuote] item:", JSON.stringify(item, null, 2));

  const mappedInput = { sys: { id: item.sys.id }, fields: { quote: item.quote?.json, author: item.author?.json } };
  console.log("[getQuote] mappedInput:", JSON.stringify(mappedInput, null, 2));

  return mapQuoteEntry(mappedInput);
}

export default getQuote;
