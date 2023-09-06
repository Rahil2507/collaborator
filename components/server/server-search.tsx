"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { CommandDialog, CommandGroup, CommandEmpty, CommandInput, CommandList, CommandItem } from "@/components/ui/command"

interface ServerSearchProps {
  data: {
    label: string
    type: "channel" | "member"
    data: {
      icon: React.ReactNode
      name: string
      id: string
    } [] | undefined
  } []
}

export const ServerSearch = ({data}: ServerSearchProps) => {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  
  const onClick = ({id, type}: {id: string, type: "channel" | "member"}) => {
    setOpen(false)
    
    return router.push(`/severs/${params?.serverId}/${type==="channel" ? "channels" : "conversations"}/${id}`)

    // if (type === "member") return router.push(`/severs/${params?.serverId}/conservations/${id}`)

    // if (type === "channel") return router.push(`/severs/${params?.serverId}/channels/${id}`)
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700 dark:hover:bg-zinc-700/50 transition">
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition ">Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="">Ctrl</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({label, type, data}) => {
            if (!data?.length) return null

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({id, icon, name}) => {
                  return (
                    <CommandItem onSelect={() => onClick({id, type})} key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </div>
  )
}