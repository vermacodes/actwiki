type Props = {
    title: string;
    description: string;
    slug: string;
    date: Date;
    tags?: (string | undefined)[];
};

export default function PostCard({ title, description, slug, date, tags }: Props) {
    return (
        <div className="border-l border-slate-200 dark:border-slate-800 flex flex-col md:flex-row p-4 gap-x-8 md:gap-y-10 gap-y-2 mb-5">
            <div className="text-slate-600 dark:text-slate-400 min-w-fit md:p-8">
                <h3 className="text-slate-600 md:pt-2 dark:text-slate-400 text-xl">
                    {date.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })}
                </h3>
            </div>
            <a
                className="md:hover:bg-slate-200 md:p-8  md:dark:hover:bg-emerald-500 md:dark:hover:outline outline-1 md:dark:hover:outline-emerald-500 md:dark:hover:bg-opacity-10 gap-y-4 space-y-4 rounded-2xl w-full"
                href={slug}
            >
                <h3 className="text-3xl">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xl">{description}</p>
                {/* <div className="flex flex-row divide-x divide-slate-500">
                    {tags.map((tag) => (
                        <p className="mt-4 px-2 text-xl flex flex-row">{tag}</p>
                    ))}
                </div> */}
            </a>
        </div>
    );
}
