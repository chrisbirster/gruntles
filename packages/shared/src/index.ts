export type Prompt = { id: string; question: string; hint: string; emoji: string; category: "remember" | "appreciate" | "reflect" };
export type JournalEntry = { id: string; createdAt: string; answers: Record<string, string> };
export const prompts: readonly Prompt[] = [
  { id: "memory", question: "What will future-you forget about today?", hint: "The little stuff deserves a place to live.", emoji: "📓", category: "remember" },
  { id: "gruntled", question: "What are you gruntled about today?", hint: "It doesn't have to be a big deal.", emoji: "☀️", category: "appreciate" },
  { id: "surprise", question: "What unexpectedly went okay?", hint: "Give the small wins some credit.", emoji: "✨", category: "reflect" },
  { id: "silly", question: "What felt silly in hindsight?", hint: "The plot twists count, too.", emoji: "🃏", category: "reflect" },
  { id: "noticed", question: "What happened that no one else noticed?", hint: "Even if it was just you.", emoji: "👀", category: "remember" },
  { id: "person", question: "Who made today a little better?", hint: "A small kindness goes a long way.", emoji: "💛", category: "appreciate" }
];
export const nightlyPrompts = prompts.slice(0, 3);
export const STORAGE_KEY = "gruntles.entries.v1";
export function entryForDate(entries: readonly JournalEntry[], date: string): JournalEntry | undefined {
  return entries.find(entry => entry.createdAt.slice(0, 10) === date);
}
