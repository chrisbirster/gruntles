import {useEffect,useState} from "react";
import {Link} from "react-router";
import {useImmer} from "use-immer";
import {nightlyPrompts,STORAGE_KEY,type JournalEntry} from "@gruntles/shared";
import {Mascot} from "../components/Mascot";

function readEntries(): JournalEntry[] {
 try {
  const parsed:unknown=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
  if(!Array.isArray(parsed)) return [];
  return parsed.filter((entry):entry is JournalEntry=>typeof entry==="object"&&entry!==null&&typeof entry.id==="string"&&typeof entry.createdAt==="string"&&typeof entry.answers==="object"&&entry.answers!==null);
 } catch {return [];}
}
const pretty=(date:string)=>new Date(date).toLocaleString();
export function Journal() {
 const [answers,updateAnswers]=useImmer<Record<string,string>>({});
 const [index,setIndex]=useState(0);
 const [entries,setEntries]=useImmer<JournalEntry[]>(readEntries);
 const [mode,setMode]=useState<"write"|"saved"|"archive">("write");
 const [editing,setEditing]=useState<string|null>(null);
 const [feedback,setFeedback]=useState("");
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(entries))},[entries]);
 const prompt=nightlyPrompts[index];
 function save(){
  if(!Object.values(answers).some(value=>value.trim()))return;
  const copy={...answers};
  if(editing){
   setEntries(draft=>{const old=draft.find(item=>item.id===editing);if(old)old.answers=copy});
  }else{
   setEntries(draft=>{draft.unshift({id:crypto.randomUUID(),createdAt:new Date().toISOString(),answers:copy})});
  }
  setEditing(null);setFeedback("");setMode("saved");
 }
 function begin(){
  updateAnswers({});setEditing(null);setIndex(0);setFeedback("");setMode("write");
 }
 function edit(entry:JournalEntry){
  updateAnswers({...entry.answers});setEditing(entry.id);setIndex(0);setMode("write");
 }
 function remove(entry:JournalEntry){
  if(!window.confirm("Delete this memory permanently from this browser?"))return;
  setEntries(draft=>{const i=draft.findIndex(value=>value.id===entry.id);if(i>=0)draft.splice(i,1)});
  setFeedback("Memory deleted.");
 }
 function exportData(){
  const json=JSON.stringify({version:1,exportedAt:new Date().toISOString(),entries},null,2);
  const url=URL.createObjectURL(new Blob([json],{type:"application/json"}));
  const anchor=document.createElement("a");anchor.href=url;anchor.download="gruntles-journal.json";anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  setFeedback("Export prepared. Keep your journal file private.");
 }
 return <main className="journal-page">
 <nav className="wrap journal-nav"><Link className="wordmark" to="/">gruntles<span>✦</span></Link><Link to="/">← Back home</Link></nav>
 <div className="journal-shell">
 <div className="journal-view-switch"><button aria-pressed={mode!=="archive"} onClick={begin}>Tonight</button><button aria-pressed={mode==="archive"} onClick={()=>setMode("archive")}>My memories ({entries.length})</button></div>
 {mode==="write"?<>
  <p className="eyebrow">☾ GOOD EVENING, HUMAN</p>
  <h1>{editing?"Revisit this moment.":"Let's debrief the day."}</h1>
  <p>Three little prompts. No perfect answers. Skipping is okay.</p>
  <div className="step-indicator">Question {index+1} of {nightlyPrompts.length}<div><span style={{width:`${((index+1)/nightlyPrompts.length)*100}%`}}/></div></div>
  <div className="question-card"><div className="question-emoji">{prompt.emoji}</div><h2>{prompt.question}</h2><p>{prompt.hint}</p><textarea aria-label={prompt.question} placeholder="Just a sentence or two..." value={answers[prompt.id]||""} onChange={event=>updateAnswers(d=>{d[prompt.id]=event.target.value})}/></div>
  <div className="journal-buttons"><button className="button-outline" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>← Back</button>{index===nightlyPrompts.length-1?<button className="button-primary" onClick={save} disabled={!Object.values(answers).some(a=>a.trim())}>Save my gruntles ✨</button>:<button className="button-primary" onClick={()=>setIndex(i=>i+1)}>Next question →</button>}</div>
 </>:mode==="saved"?<>
 <Mascot size={185} heart/><p className="eyebrow">✦ FEELINGS NOTICED</p><h1>Journaled. Emotionally iconic.</h1>
 <p>Little things, officially remembered. Your answers stay in this browser.</p>
 <div className="journal-buttons"><button className="button-primary" onClick={begin}>Another reflection</button><button className="button-outline" onClick={()=>setMode("archive")}>See memories</button></div>
 </>:<>
 <p className="eyebrow">✦ YOUR LITTLE ARCHIVE</p><h1>Remember this?</h1>
 <p>The ordinary days make a pretty extraordinary collection.</p>
 <button className="button-outline" onClick={exportData} disabled={!entries.length}>Export JSON ↓</button>
 {feedback&&<p role="status">{feedback}</p>}
 {entries.length===0?<div className="saved-entry"><p>No memories yet. Future you is excited to meet them.</p><button className="button-primary" onClick={begin}>Write your first entry</button></div>:entries.map(entry=><article className="saved-entry" key={entry.id}><small>{pretty(entry.createdAt)}</small>{nightlyPrompts.map(p=>entry.answers[p.id]?<p key={p.id}><b>{p.question}</b><br/>{entry.answers[p.id]}</p>:null)}<div className="entry-actions"><button className="button-outline" onClick={()=>edit(entry)}>Edit</button><button className="delete-button" onClick={()=>remove(entry)}>Delete</button></div></article>)}
 </>}
 </div></main>;
}
