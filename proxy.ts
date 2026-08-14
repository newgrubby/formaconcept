import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "./lib/i18n";
const latinEs = new Set(["ES","MX","AR","CO","CL","PE","VE","EC","GT","CU","BO","DO","HN","PY","SV","NI","CR","PA","UY"]);
const russian = new Set(["RU","BY","KZ","KG"]);
export function proxy(req:NextRequest){
 const {pathname}=req.nextUrl;
 if(pathname!=="/") return NextResponse.next();
 const saved=req.cookies.get("forma-locale")?.value;
 const accept=req.headers.get("accept-language")?.toLowerCase()||"";
 const country=req.headers.get("x-vercel-ip-country")||"";
 const locale=isLocale(saved||"")?saved!:accept.startsWith("ru")?"ru":accept.startsWith("es")?"es":latinEs.has(country)?"es":russian.has(country)?"ru":"en";
 return NextResponse.redirect(new URL(`/${locale}`,req.url));
}
export const config={matcher:["/"]};
