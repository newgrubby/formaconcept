import { dictionaries,isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Experience from "@/components/Experience";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <Experience locale={locale} copy={dictionaries[locale]}/>}
