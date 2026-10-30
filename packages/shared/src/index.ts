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

/** Validate a user-supplied v1 backup before writing anything to storage. */
export function parseJournalBackup(source: string): JournalEntry[] {
 const data: unknown = JSON.parse(source);
 if (typeof data !== "object" || data === null || !("version" in data) || data.version !== 1 || !("entries" in data) || !Array.isArray(data.entries)) {
  throw new Error("This is not a supported Gruntles v1 backup.");
 }
 if (data.entries.length > 100_000) throw new Error("Backup contains too many entries.");
 const ids = new Set<string>();
 return data.entries.map((candidate:unknown) => {
  if (typeof candidate !== "object" || candidate === null || !("id" in candidate) || typeof candidate.id !== "string" || !candidate.id || ids.has(candidate.id) ||
      !("createdAt" in candidate) || typeof candidate.createdAt !== "string" || !Number.isFinite(Date.parse(candidate.createdAt)) ||
      !("answers" in candidate) || typeof candidate.answers !== "object" || candidate.answers === null || Array.isArray(candidate.answers)) {
   throw new Error("Backup contains an invalid or duplicate entry.");
  }
  const answers = candidate.answers as Record<string,unknown>;
  if (Object.keys(answers).some(key=>typeof answers[key] !== "string")) throw new Error("Backup contains an invalid answer.");
  ids.add(candidate.id);
  return {id:candidate.id,createdAt:candidate.createdAt,answers:answers as Record<string,string>};
 });
}
