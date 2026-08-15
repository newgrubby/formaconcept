"use client";

import { useEffect, useRef, useState } from "react";
import type { dictionaries, Locale } from "@/lib/i18n";

type Copy = (typeof dictionaries)[Locale];
const zones = [
  { x: 7, y: 12, w: 42, h: 42 },
  { x: 49, y: 12, w: 27, h: 42 },
  { x: 76, y: 12, w: 18, h: 42 },
  { x: 7, y: 59, w: 87, h: 31 },
] as const;
const volumePaths = ["80,236 235,286 235,176 80,130", "235,286 342,253 342,146 235,176", "342,253 418,229 418,122 342,146", "80,294 342,350 438,315 235,286"];

function PlanLinework() {
  return <svg className="planLinework" viewBox="0 0 520 360" preserveAspectRatio="none" aria-hidden="true">
    <g className="planAxes"><path d="M40 38v292M276 38v292M474 38v292M18 70h482M18 246h482"/><text x="35" y="28">A</text><text x="271" y="28">B</text><text x="469" y="28">C</text><text x="6" y="75">1</text><text x="6" y="251">2</text></g>
    <g className="planWalls"><path d="M48 70H474V246H48ZM48 246V330H474V246"/><path d="M276 70v75m0 48v53M392 70v63m0 47v66"/></g>
    <g className="planWindows"><path d="M82 246h132m18 0h92M72 70h102M474 94v56"/><path d="M82 249h132m18 0h92M72 73h102M471 94v56"/></g>
    <g className="planDoors"><path d="M276 145h-46v46M230 145a46 46 0 0 0 46 46M392 133h-39v45M353 133a39 39 0 0 1 39 39M474 182h-44v48M430 182a44 44 0 0 1 44 44"/></g>
    <g className="planCore"><rect x="312" y="88" width="62" height="88"/><path d="M320 96h46m-46 10h46m-46 10h46m-46 10h46m-46 10h46m-46 10h46m-46 10h46m-23-60v60"/><text x="317" y="169">↑</text></g>
    <g className="planFurniture"><path d="M86 116h92v50H86zM106 104h52M185 105h62v22h-62M292 202h70v20h-70M406 92h42v31h-42"/><circle cx="205" cy="160" r="18"/><path d="M90 281h116m22 0h112m-250 13h116m22 0h112"/></g>
    <g className="planDimensions"><path d="M48 346v10M474 346v10M48 352h426M32 70H20M32 246H20M26 70v176"/><text x="235" y="349">12 000</text><text x="14" y="174" transform="rotate(-90 14 174)">7 200</text></g>
  </svg>;
}

function SpatialVolume({ active }: { active: number }) {
  return <svg className={`spatialVolume activeRoom${active}`} viewBox="0 0 520 390" aria-hidden="true">
    <defs><linearGradient id="volumeGlass" x1="0" x2="1"><stop stopColor="#c9dde3" stopOpacity=".72"/><stop offset="1" stopColor="#6d8992" stopOpacity=".6"/></linearGradient></defs>
    <g className="volumeGrid"><path d="M48 294 342 390M122 270l294 96M196 246l294 96M80 130 374 226M235 96l294 96"/></g>
    <polygon className="volumeBase" points="80,294 342,350 438,315 174,257"/>
    {volumePaths.map((points, index) => <g className={`volumeRoom room${index} ${active === index ? "selected" : ""}`} key={points}>
      <polygon className="roomFloor" points={points}/>
      <path className="roomRise" d={index === 0 ? "M80 236v-106l155 46v110M235 176 80 130" : index === 1 ? "M235 286V176l107-30v107M235 176l107-30" : index === 2 ? "M342 253V146l76-24v107M342 146l76-24" : "M80 294v-54l262 55v55M342 295l96-34v54"}/>
      <text x={[135,272,366,218][index]} y={[220,240,211,326][index]}>0{index + 1}</text>
    </g>)}
    <g className="volumeCore"><path d="m292 153 55-17v93l-55 17zM292 153l-43-13 55-16 43 12M249 140v92l43 14"/><path d="m266 214 64-19m-64 7 64-19m-64 7 64-19"/></g>
    <g className="volumeFacade"><path d="M80 130 235 176v110M235 176l107-30v107M342 146l76-24v107"/><path d="M119 142v104m39-92v104m38-92v103M271 166v109m36-120v109M368 138v104M394 130v104"/></g>
    <path className="volumeDatum" d={`M35 ${[218,238,210,326][active]}H485`}/>
  </svg>;
}

export default function FloorPlan({ copy }: { copy: Copy }) {
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const active = preview ?? selected;
  useEffect(() => { const room = Number(new URLSearchParams(window.location.search).get("room")); if (!Number.isInteger(room) || room < 0 || room >= zones.length) return; const timer = window.setTimeout(() => setSelected(room), 0); return () => window.clearTimeout(timer); }, []);

  const move = (index: number, direction: number) => {
    const next = (index + direction + zones.length) % zones.length;
    setSelected(next);
    buttons.current[next]?.focus();
  };

  return <section id="floor-plan" className="floorSection" data-section>
    <div className="floorIntro"><p className="eyebrow">{copy.floorLabel}</p><h2>{copy.floorTitle}</h2><p>{copy.floorBody}</p><small>{copy.floorDemo}</small></div>
    <p className="floorInstruction">{copy.floorInstruction}</p>
    <div className="floorPair">
      <svg className="planLink" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d={`M${[24,39,47,31][active]} ${[52,52,52,76][active]} C48 ${[45,52,58,72][active]} 58 ${[36,44,52,67][active]} 75 ${[42,48,54,65][active]}`}/><circle cx="75" cy={[42,48,54,65][active]} r=".35"/></svg>
      <div className="planPanel"><b>{copy.floorPlan}</b><div className="planDrawing"><PlanLinework/>{zones.map((zone, index) => <button
        ref={element => { buttons.current[index] = element; }} data-cursor={copy.cursorView} key={copy.floorAreas[index]}
        aria-pressed={selected === index} aria-label={`${copy.floorAreas[index]}, ${copy.floorSizes[index]}`}
        onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(index); }} onPointerLeave={() => setPreview(null)}
        onFocus={() => setPreview(index)} onBlur={() => setPreview(null)} onClick={() => setSelected(index)}
        onKeyDown={event => { if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index, 1); } if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index, -1); } }}
        className={`${active === index ? "active" : ""} ${selected === index ? "selected" : ""}`}
        style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}>
        <span>0{index + 1}</span><strong>{copy.floorAreas[index]}</strong><small>{copy.floorSizes[index]}</small><i/>
      </button>)}</div></div>
      <div className="volumePanel"><b>{copy.floorVolume}</b><div className="volumeStage"><SpatialVolume active={active}/></div><div className="roomInfo" aria-live="polite"><span>0{active + 1}</span><div><h3>{copy.floorAreas[active]}</h3><p>{copy.floorSizes[active]} · {copy.floorFunctions[active]}</p><small>{copy.floorDemo}</small></div></div></div>
    </div>
  </section>;
}
