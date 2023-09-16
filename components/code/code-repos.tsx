"use client";

import { FolderGit2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

export const CodeRepos = ({ repo, githubUser }: { repo: Repository, githubUser: string }) => {
  const router = useRouter();

  return (
    <div className="">
      <button onClick={() => router.push(`${githubUser}/${repo.name}`)}  className="w-full group my-2 px-2 py-3 rounded-md flex items-center justify-start gap-x-2 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
        <FolderGit2 className="h-5 w-5 text-zinc-400" />
        <div className="flex items-center ">
          <p className="pl-5 line-clamp-1 min-w-[200px] text-start font-semibold text-lg text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">{repo.name}</p>
          {repo.description && <p className="hidden md:block line-clamp-1 ml-2 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400 transition"> : {repo.description}</p>}
        </div>
      </button>
    </div>
  );
};
