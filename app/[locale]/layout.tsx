import { dictionaries,isLocale,locales,Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
export const dynamicParams=false;
export function generateStaticParams(){return locales.map(locale=>({locale}))}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const title=locale==="ru"?"FORMA — от идеи к пространству":locale==="es"?"FORMA — de la idea al espacio":"FORMA — from idea to space";const desc=dictionaries[locale].manifestoBody;return {metadataBase:new URL("https://forma.eolabs.dev"),title,description:desc,alternates:{canonical:`/${locale}`,languages:{en:"/en",ru:"/ru",es:"/es","x-default":"/en"}},openGraph:{title,description:desc,type:"website",locale}}}
export default async function LocaleLayout({children,params}:{children:React.ReactNode,params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <html lang={locale as Locale}><body>{children}</body></html>}
