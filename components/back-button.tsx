"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()

  return (
    <div className="px-2 my-2">
      <button onClick={() => router.back()}  className="group px-2 py-3 rounded-md flex items-center gap-x-2 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
      <ChevronLeft className="h-5 w-5 text-zinc-400" />
      <p className="mr-3 line-clamp-1 font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Back</p>
      </button>
    </div>
  )
} 