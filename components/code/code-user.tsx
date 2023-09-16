"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import qs from "query-string"

import { useModal } from "@/hooks/use-modal-store"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Github, UserPlus, Users } from "lucide-react"
import Image from "next/image"


interface CodeUserProps {
  serverId: string
}

type User = {
  id: string;
  name: string;
  content: Object & {
    name: string
    login: string
    avatar_url: string
    blog: string
    location: string
    bio: string

  }
};

export const CodeUser = ({serverId}: CodeUserProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User>()

  const getGithubUsers = async () => {
    const url = qs.stringifyUrl({
      url: "/api/code/",
      query: {
        serverId: serverId,
      }
    })
    const res = await axios.get(url)
    setUsers(res.data)
  }

  useEffect(() => {
    getGithubUsers()
  }, [])  
  
  
  return (
    <div className="flex-col-reverse md:flex-row text-md font-semibold px-3 py-3 flex justify-center items-center md:h-full">
      <div id="right" className="mx-20 mt-5">
        <div className="">
          <button onClick={() => setOpen(true)}  className="group px-2 py-3 rounded-md flex items-center justify-center gap-x-2 w-48 h-16 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
            <Users className="h-5 w-5 text-zinc-400" />
            <p className="line-clamp-1 font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Choose Users</p>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search all Github Users" />
            <CommandList className="px-6 my-4">
              {/* <CommandEmpty>No Results found</CommandEmpty> */}
              {users.length <= 1 && <CommandItem>
                <span>No users found. Please add some.</span>
              </CommandItem>}
              {users.map((user) => {
                return (
                  <CommandItem onSelect={() => {setSelectedUser(user); setOpen(false)}} key={user.id}>
                    <span>{user.name} : {user.content.login}</span>
                  </CommandItem>
                )
              })}
            </CommandList>
          </CommandDialog>  
        </div>

        <div className="my-5">
            <button onClick={() => onOpen("chooseUser")}  className="group px-2 py-3 rounded-md flex items-center justify-center gap-x-2 w-48 h-16 bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition mb-1">
              <UserPlus className="h-5 w-5 text-zinc-400" />
              <p className="line-clamp-1 font-semibold text-md text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">Add an User</p>
            </button>
        </div>
      </div>
      
      <div id="left" className="flex w-full justify-center items-center">
          {selectedUser && <div onClick={() => router.push(`code/${selectedUser.content.login}`)} className="group p-5 rounded-md flex flex-col justify-center items-start bg-zinc-300 dark:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700 transition cursor-pointer">
            {selectedUser?.name && <p className="text-xl text-zinc-300">{selectedUser?.name}</p>}
            {selectedUser?.content.avatar_url && <Image src={selectedUser.content.avatar_url} height={180} width={180} alt={`Github User: ${selectedUser?.name}`} className="object-contain mb-5"/>}
            {selectedUser?.content.login && <span className="py-1 text-xs text-zinc-400  flex"><p className="text-zinc-300 font-semibold w-16">ID: </p>{selectedUser?.content.login}</span>}
            {selectedUser?.content.blog && <span className="py-1 text-xs text-zinc-400  flex"><p className="text-zinc-300 font-semibold w-16">Blog: </p> {selectedUser?.content.blog}</span>}
            {selectedUser?.content.location && <span className="py-1 text-xs text-zinc-400  flex"><p className="text-zinc-300 font-semibold w-16">Location: </p>{selectedUser?.content.location}</span>}
            {selectedUser?.content.bio && <span className="py-1 text-xs text-zinc-400 flex"><p className="text-zinc-300 font-semibold w-16">Bio: </p><p className="max-w-[200px] md:max-w-[300px]">{selectedUser?.content.bio}</p></span>}
            <div className="w-full flex justify-center mt-5">
            <button onClick={() => onOpen("chooseUser")}  className="group px-2 py-3 rounded-md flex items-center justify-center gap-x-2 w-48 h-16 mb-1">
              <Github className="h-5 w-5 text-zinc-400" />
              <p className="line-clamp-1 font-semibold text-md text-zinc-500  dark:text-zinc-400 ">Go to repo</p>
            </button>
        </div>
          </div>}
          
      </div>
    </div>
  )
}