export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
export const CONTENTFUL_CDA_API_KEY = process.env.CONTENTFUL_CDA_API_KEY;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_CDA_API_KEY) {
  // Do not throw here to keep dev flow flexible, but provide a helpful runtime error when used.
}

export async function graphql<T = any>(query: string, variables?: Record<string, any>) {
  if (!CONTENTFUL_SPACE_ID) {
    throw new Error("Missing CONTENTFUL_SPACE_ID environment variable");
  }
  if (!CONTENTFUL_CDA_API_KEY) {
    throw new Error("Missing CONTENTFUL_CDA_API_KEY environment variable");
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONTENTFUL_CDA_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (!res.ok || json.errors) {
    const message = json.errors?.map((e: any) => e.message).join(", ") || res.statusText;
    throw new Error(`Contentful GraphQL error: ${message}`);
  }

  return json.data as T;
}
