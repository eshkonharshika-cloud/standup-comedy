declare module '@repo/ui';

declare module 'zustand' {
  export default function create<T>(f: (set: any, get?: any) => T): T;
}

declare module 'uuid' {
  export function v4(): string;
}
