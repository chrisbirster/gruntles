import assert from "node:assert/strict";
import test from "node:test";
import {entryForDate, nightlyPrompts, prompts, STORAGE_KEY} from "./index.ts";

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
