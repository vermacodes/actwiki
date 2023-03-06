import ThemToggle from "../ThemeToggle";
import type { CollectionEntry } from "astro:content";

const actLabsLogoImage = new URL("/actlabs_logo.svg", import.meta.url).href;

type Props = {
    docs?: CollectionEntry<"docs">[];
};

export default function Navbar({ docs }: Props) {
    return (
        <nav className="text-slate-900 dark:text-slate-100 border-r dark:border-slate-800 border-slate-200 flex flex-col min-h-screen min-w-max w-1/5 p-2 md:p-8">
            {/* <div className="flex justify-end w-full mb-5 border-b border-slate-500 pb-2 md:pb-4">
                <ThemToggle />
            </div> */}
            <h1 className="flex items-center border-b-2 border-transparent text-2xl font-bold pb-4 ">
                <img src="/actlabs_logo.svg" className="mr-2 h-8 w-8"></img>
                ACT Labs Docs
            </h1>
            <ul className="flex flex-col py-2 w-full justify-start gap-y-2 text-sm md:text-l lg:text-xl rounded-full bg-slate-100 dark:bg-slate-900">
                {/* {docs &&
                    docs.map((doc) => (
                        <li>
                            <a href={doc.slug}>{doc.data.title}</a>
                        </li>
                    ))} */}
                <li className="hover:text-emerald-500">
                    <a href="introduction">Introduction</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="getting-started">Getting Started</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="server">Server on Docker</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="templates">Saved and Public Labs</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="builder">Lab Builder</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="learning">Learning (L100)</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="labs">Labs for Learning</a>
                </li>
                <li className="hover:text-emerald-500">
                    <a href="mock-cases">Mock Cases</a>
                </li>
            </ul>
        </nav>
    );
}
