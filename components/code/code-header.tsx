import { Computer } from "lucide-react"
import { MobileToggle } from "@/components/mobile-toggle"


interface CodeHeaderProps {
  serverId: string
  label: string
}

export const CodeHeader = ({serverId, label}: CodeHeaderProps) => {
  return (
    <div className="text-md font-semibold px-4 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      <Computer className="w-5 h-5 text-zinc-600 dark:text-zinc-300 mr-2" />
      <p className="font-semibold text-sm md:text-lg text-black dark:text-white">{label}</p>
    </div>
  )
}