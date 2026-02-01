import {algoliasearch }from "algoliasearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

// Compatibility wrapper using the v5 `client.search` API so initIndex isn't required at runtime
export const comediansIndex = {
  async search(query: string, opts?: Record<string, any>) {
    try {
      const params = { query, ...(opts ?? {}) };
      const res = await (client as any).search([{ indexName: "standup_youtube_videos", params }]);
      const first = res?.results?.[0] ?? {};
      return { hits: first.hits ?? [] };
    } catch (err) {
      console.error("Algolia search error:", err);
      return { hits: [] };
    }
  },
};
