"use client"

import { Chrome, Code2, Computer, Network, ScreenShare } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, redirect } from "next/navigation"

export const ServerCode = () => {
  const params = useParams()

  return (
    <div className="px-2 mb-1">
      <Link href={`/servers/${params?.serverId}/code`}  className="group px-2 py-3 rounded-md flex items-center gap-x-2 w-full bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
      <Computer className="h-5 w-5 text-zinc-400" />
      <p className="line-clamp-1 font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Code</p>
      </Link>
    </div>
  )
} 