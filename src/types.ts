export type PlatformItem = { title?: string; text?: string; rating?: number; date?: string; url?: string };
export type PlatformSummary = { name: string; rating?: number; count?: number; url?: string; items: PlatformItem[] };
