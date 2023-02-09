import React from "react";
import ThemToggle from "../ThemeToggle";

type Props = {};

export default function Navbar({}: Props) {
    return (
        <nav className="text-slate-900 dark:text-slate-100 flex justify-center">
            <div className="flex divide-x divide-slate-300 align-middle  dark:divide-slate-700 ">
                <ul className="flex py-2 align-middle items-center gap-x-6 text-xl lg:text-2xl border border-slate-200 dark:border-slate-800 px-6 rounded-full bg-slate-100 dark:bg-slate-900">
                    {/* <ul className="flex gap-x-3 px-5 items-center text-3xl"> */}
                    <li>
                        <a
                            className="border-b-2 border-transparent py-1 hover:border-b-2 hover:border-b-slate-900 dark:hover:border-b-slate-100"
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="border-b-2 border-transparent py-1 hover:border-b-2 hover:border-b-slate-900 dark:hover:border-b-slate-100">
                            Projects
                        </a>
                    </li>
                    <li>
                        <a
                            className="border-b-2 border-transparent py-1 hover:border-b-2 hover:border-b-slate-900 dark:hover:border-b-slate-100"
                            href="/blog/"
                        >
                            Blog
                        </a>
                    </li>
                    <li>
                        <a className="border-b-2 border-transparent py-1 hover:border-b-2 hover:border-b-slate-900 dark:hover:border-b-slate-100">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a className="border-b-2 border-transparent py-1 hover:border-b-2 hover:border-b-slate-900 dark:hover:border-b-slate-100">
                            GitHub
                        </a>
                    </li>
                    <li>
                        <ThemToggle />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
