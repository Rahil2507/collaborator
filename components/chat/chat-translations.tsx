"use client"

import { GetTranslationLanguages, UseTextTranslate } from "@/hooks/use-text-translate"
import { Languages } from "lucide-react";
import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ChatTranslationProps {
  content: string
}

interface Language {
  code: string;
  name: string;
}

export const ChatTranslation = ({content}: ChatTranslationProps) => {
  const [text, setText] = useState(content)
  const [open, setOpen] = useState(false)
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const data: Language[] = await GetTranslationLanguages()
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    getLanguages();
  }, []);
  

  const translate = async (code: string) => {
    const res = await UseTextTranslate({text, target: code})
    
    setText(res)
    setOpen(false)
  }

  return (
    <div className="flex items-center w-full">
      <p>{text}</p>
      <div className="ml-4">
        <button onClick={() => setOpen(true)} className="group mt-[2px] py-1 px-2 rounded-md flex items-center gap-x-2 w-full bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-700/50 transition">
          <Languages className="w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
          {/* <p className="font-semibold text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition ">Translate</p> */}
        </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search all languages" />
            <CommandList className="px-6 my-4">
              <CommandEmpty>No Results found</CommandEmpty>
              {languages.map(({code, name}) => {
                return (
                  <CommandItem onSelect={() => translate(code)} key={code}>
                    <span>{name}</span>
                  </CommandItem>
                )
              })}
            </CommandList>
          </CommandDialog>
      </div>
    </div>
  )
}