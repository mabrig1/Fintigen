"use client";
import {useMemo,useState} from "react";
const initial="region,sales,cost\nNorth,125000,80000\nSouth,94000,61000\nEast,158000,103000\nWest,112000,88000";
type Row={region:string;sales:number;cost:number};
export default function AnalyticsWorkbench(){
 const [csv,setCsv]=useState(initial);
 const [metric,setMetric]=useState<"sales"|"cost"|"profit">("profit");
 const [region,setRegion]=useState("All");
 const parsed=useMemo(()=>{
  const lines=csv.trim().split(/\r?\n/);
  if(lines[0]?.trim().toLowerCase()!=="region,sales,cost")return {rows:[] as Row[],error:"Header must be region,sales,cost"};
  if(lines.length<2||lines.length>101)return {rows:[] as Row[],error:"Enter 1 to 100 data rows"};
  const rows:Row[]=[];
  for(let i=1;i<lines.length;i++){
   const c=lines[i].split(",").map(v=>v.trim());
   if(c.length!==3||!c[0]||!c[1]||!c[2]||!c.slice(1).every(v=>Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=1e12))return {rows:[] as Row[],error:"Invalid data on row "+(i+1)};
   rows.push({region:c[0],sales:Number(c[1]),cost:Number(c[2])});
  }
  return {rows,error:""};
 },[csv]);
 const regions=Array.from(new Set(parsed.rows.map(r=>r.region)));
 const rows=parsed.rows.filter(r=>region==="All"||r.region===region);
 const value=(r:Row)=>metric==="profit"?r.sales-r.cost:r[metric];
 const total=(key:"sales"|"cost")=>rows.reduce((a,r)=>a+r[key],0);
 const max=Math.max(1,...rows.map(r=>Math.abs(value(r))));
 const money=(n:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);
 return <section className="mt-6 rounded-xl border border-slate-300 p-4 dark:border-slate-700">
  <h2 className="text-lg font-bold">Interactive Analytics Lab</h2>
  <p className="mt-2 text-sm">Edit this synthetic CSV, choose a metric and inspect the results. Data stays in your browser.</p>
  <label htmlFor="analytics-dataset" className="mt-3 block text-sm font-semibold">Practice dataset</label>
  <textarea id="analytics-dataset" value={csv} onChange={e=>setCsv(e.target.value)} rows={6} spellCheck={false} className="mt-2 w-full rounded-lg border bg-transparent p-3 font-mono text-sm"/>
  {parsed.error?<p role="alert" className="mt-2 text-red-600">{parsed.error}</p>:<>
   <div className="mt-3 flex flex-wrap gap-4">
    <label>Metric <select className="rounded border bg-background p-2" value={metric} onChange={e=>setMetric(e.target.value as typeof metric)}><option value="profit">Profit</option><option value="sales">Sales</option><option value="cost">Cost</option></select></label>
    <label>Region <select className="rounded border bg-background p-2" value={region} onChange={e=>setRegion(e.target.value)}><option>All</option>{regions.map(r=><option key={r}>{r}</option>)}</select></label>
   </div>
   <p className="mt-3 text-sm">Revenue: <strong>{money(total("sales"))}</strong> · Costs: <strong>{money(total("cost"))}</strong> · Profit: <strong>{money(total("sales")-total("cost"))}</strong></p>
   <div className="mt-4 space-y-3" aria-label="Chart of selected metric by region">{rows.map((r,i)=><div key={i}><div className="flex justify-between gap-2 text-sm"><span>{r.region}</span><strong>{money(value(r))}</strong></div><div className="h-4 rounded bg-slate-200 dark:bg-slate-700"><div className="h-full rounded bg-sky-600" style={{width:(Math.abs(value(r))/max*100)+"%"}}/></div></div>)}</div>
  </>}
  <button type="button" onClick={()=>{setCsv(initial);setMetric("profit");setRegion("All")}} className="mt-4 rounded border px-4 py-2 text-sm">Reset lab</button>
 </section>;
}
