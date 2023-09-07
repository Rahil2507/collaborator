import { Loader2, Webhook } from "lucide-react";

export function InitialLoding() {
  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center justify-center">
        <div className="mx-10 mb-20 ">
          <p className="text-zinc-600 text-md">Wlecome to</p>
          <span className="flex flex-col">
            <p className="text-zinc-300 text-6xl">RADIANT</p>
            <p className="text-zinc-400 text-xs font-thin">where collaboration meets seamless communication in your own virtual workspace.</p>
          </span>
        </div>       
          <Webhook className="h-32 w-32 md:h-48 md:w-48 text-zinc-600 animate-bounce mx-20" />

    </div>
  )
}