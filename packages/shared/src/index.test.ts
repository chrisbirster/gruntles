import assert from "node:assert/strict";
import test from "node:test";
import {entryForDate, nightlyPrompts, prompts, STORAGE_KEY,parseJournalBackup} from "./index.ts";

test("nightly prompts contain three distinct short-answer questions",()=>{
 assert.equal(nightlyPrompts.length,3);
 assert.equal(new Set(nightlyPrompts.map(p=>p.id)).size,3);
 assert.ok(nightlyPrompts.every(p=>p.question.endsWith("?")));
});
test("journal prompts have stable unique IDs",()=>{
 assert.equal(new Set(prompts.map(p=>p.id)).size,prompts.length);
 assert.ok(prompts.some(p=>p.id==="gruntled"));
});
test("entryForDate returns matching entry without mutating history",()=>{
 const entries=[{id:"a",createdAt:"2026-10-29T20:31:00.000Z",answers:{gruntled:"tea"}},{id:"b",createdAt:"2026-10-28T20:00:00.000Z",answers:{gruntled:"sun"}}];
 assert.equal(entryForDate(entries,"2026-10-29")?.id,"a");
 assert.equal(entryForDate(entries,"2026-10-30"),undefined);
 assert.equal(entries.length,2);
});
test("storage format is versioned",()=>assert.match(STORAGE_KEY,/\.v1$/));

test("backup restore accepts a valid v1 export", () => {
 const entries=parseJournalBackup(JSON.stringify({version:1,entries:[{id:"abc",createdAt:"2026-10-29T18:00:00.000Z",answers:{gruntled:"sunshine"}}]}));
 assert.equal(entries[0].answers.gruntled,"sunshine");
});
test("backup restore rejects unsupported or malformed entries", () => {
 assert.throws(()=>parseJournalBackup('{"version":2,"entries":[]}'),/supported/);
 assert.throws(()=>parseJournalBackup('{"version":1,"entries":[{"id":"x","createdAt":"bad","answers":{}}]}'),/invalid/);
 assert.throws(()=>parseJournalBackup('{"version":1,"entries":[{"id":"x","createdAt":"2026-01-01","answers":{}},{"id":"x","createdAt":"2026-01-02","answers":{}}]}'),/duplicate/);
 assert.throws(()=>parseJournalBackup('{"version":1,"entries":[{"id":"x","createdAt":"2026-01-01","answers":{"gruntled":4}}]}'),/answer/);
});
