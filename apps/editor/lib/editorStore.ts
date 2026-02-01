"use client";

import create from "zustand";
import { v4 as uuid } from "uuid";
// Using local prop definitions to avoid depending on package type resolution during edits
export type HeroProps = {
  headlineTop: string;
  headlineAccent?: string;
  subtext?: string;
  ctaSearch?: string;
  ctaScroll?: string;
};

export type BlogCardProps = {
  headline: string;
  excerpt?: string;
  comedian?: string;
  category?: string;
  featuredImage?: { url: string; alt?: string };
  externalUrl?: string;
};

export type HistoryItemProps = {
  title: string;
  year?: string | number;
  description?: string;
};

export type ComponentEntry =
  | { id: string; type: "hero"; props: HeroProps }
  | { id: string; type: "blogCard"; props: BlogCardProps }
  | { id: string; type: "historyItem"; props: HistoryItemProps };

export type EditorState = {
  components: ComponentEntry[];
  selectedId?: string;
  addComponent: (type: ComponentEntry["type"]) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id?: string) => void;
  updateProps: (id: string, props: Partial<HeroProps | BlogCardProps | HistoryItemProps>) => void;
  setComponents: (c: ComponentEntry[]) => void;
};

export const useEditorStore = create((set: (fn: (s: EditorState) => Partial<EditorState>) => void) => ({
  components: [],
  selectedId: undefined,
  addComponent(type: ComponentEntry['type']) {
    const id = uuid();
    let entry: ComponentEntry;
    if (type === "hero") {
      entry = {
        id,
        type: "hero",
        props: {
          headlineTop: "Welcome to MicDropINDIA",
          headlineAccent: "Laugh More",
          subtext: "The best of Indian stand-up, made for you",
          ctaSearch: "Search",
          ctaScroll: "Explore Blog",
        },
      };
    } else if (type === "blogCard") {
      entry = {
        id,
        type: "blogCard",
        props: {
          headline: "New Blueprint",
          excerpt: "A short excerpt",
          comedian: "Author",
          category: "Comedy",
          featuredImage: undefined,
          externalUrl: "",
        },
      };
    } else {
      entry = {
        id,
        type: "historyItem",
        props: {
          title: "Stand-up begins",
          year: "1990",
          description: "A historic moment",
        },
      };
    }

    set((s: EditorState) => ({ components: [...s.components, entry], selectedId: id }));
  },
  removeComponent(id: string) {
    set((s: EditorState) => ({ components: s.components.filter((c) => c.id !== id), selectedId: s.selectedId === id ? undefined : s.selectedId }));
  },
  selectComponent(id?: string) {
    set(() => ({ selectedId: id }));
  },
  updateProps(id: string, props: Partial<HeroProps | BlogCardProps | HistoryItemProps>) {
    set((s: EditorState) => ({
      components: s.components.map((c: ComponentEntry) =>
        c.id === id
          ? ({ ...(c as unknown as ComponentEntry), props: { ...(c.props as unknown as ComponentEntry['props']), ...(props as Partial<ComponentEntry['props']>) } } as ComponentEntry)
          : c
      ),
    }));
  },
  setComponents(c: ComponentEntry[]) {
    set(() => ({ components: c }));
  },
}));
