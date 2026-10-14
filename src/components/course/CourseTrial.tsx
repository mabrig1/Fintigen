"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
const DURATION=5*60*1000;
export default function CourseTrial({course,children}:{course:string;children:React.ReactNode}){
 const key="fintigen-demo-start:"+course;
 const [started,setStarted]=useState<number|null>(null);
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{
  let saved:number|null=null;
  try {const value=localStorage.getItem(key);saved=value?Number(value):null;if(!saved||!Number.isFinite(saved)||saved>Date.now()){saved=Date.now();localStorage.setItem(key,String(saved));}}catch{saved=Date.now();}
  setStarted(saved);setNow(Date.now());
  const timer=window.setInterval(()=>setNow(Date.now()),1000);
  return ()=>window.clearInterval(timer);
 },[key]);
 if(started===null||now===null)return <p role="status" className="p-6">Preparing your interactive preview…</p>;
 const seconds=Math.max(0,Math.ceil((DURATION-(now-started))/1000));
 const expired=seconds===0;
 return <div>
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-300 bg-sky-50 p-4 text-sm text-slate-900">
   <strong>{expired?"Free preview complete":"Free interactive preview"}</strong>
   <span aria-live="off">{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,"0")} remaining</span>
  </div>
  {expired?<section className="rounded-2xl border border-amber-300 bg-amber-50 p-7 text-center text-slate-900">
   <h2 className="text-2xl font-bold">Continue your learning</h2>
   <p className="mt-3">Your five-minute preview has ended. Subscribe or purchase access to continue with lessons, projects, assessments and certificates.</p>
   <Link href="/courses" className="mt-5 inline-block rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white">View plans and enroll</Link>
   <p className="mt-3 text-xs">Payment access is granted only after verified checkout. This preview timer is a user-interface limit, not a secure entitlement check.</p>
  </section>:children}
 </div>;
}
