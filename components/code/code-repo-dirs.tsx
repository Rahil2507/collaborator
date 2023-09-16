"use client";

import { AppWindow, FolderOpen } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

interface RepoDirsProps {
  repoName: string
  dirName: string
  dirPath: string
  type: string
  githubUser: string
  serverId: string
}

export const CodeRepoDirs = ({ repoName, serverId, dirName, dirPath , type, githubUser }: RepoDirsProps) => {

  return (
    <div className="">
      {type === 'dir' && 
        <Link href={`/servers/${serverId}/code/${githubUser}/${repoName}/${dirPath}`}  className="w-full group my-2 px-2 py-3 rounded-md flex items-center justify-start gap-x-2 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
          <FolderOpen className="h-5 w-5 text-zinc-400" />
          <div className="flex items-center ">
            <p className="pl-5 line-clamp-1 min-w-[200px] text-start font-semibold text-lg text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">{dirName}</p>
          </div>
        </Link>}
      {type === 'file' && 
        <Link href={`/servers/${serverId}/code/${githubUser}/${repoName}/file?path=${dirPath}`}  className="w-full group my-2 px-2 py-3 rounded-md flex items-center justify-start gap-x-2 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
          <AppWindow className="h-5 w-5 text-zinc-400" />
          <div className="flex items-center ">
            <p className="pl-5 line-clamp-1 min-w-[200px] text-start font-semibold text-lg text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">{dirName}</p>
          </div>
        </Link>}
    </div>
  );
};
