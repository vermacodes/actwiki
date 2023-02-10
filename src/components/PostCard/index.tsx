type Props = {
    title: string;
    description: string;
    slug: string;
    date: Date;
    tags?: (string | undefined)[];
};

export default function PostCard({ title, description, slug, date, tags }: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-x-8 md:gap-y-10 gap-y-2 mb-5">
            <a
                className="md:hover:bg-slate-200 md:py-4 px-2 md:dark:hover:bg-emerald-500 md:dark:hover:bg-opacity-10 gap-y-4 space-y-4 rounded-2xl w-full"
                href={slug}
            >
                <h3 className="text-3xl">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-l">{description}</p>
            </a>
        </div>
    );
}
