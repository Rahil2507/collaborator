import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar"
import { ServerSiderbar } from "@/components/server/server-sidebar"

export const MobileToggle = ({serverId}: {serverId: string}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
        <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 w-[90vw]">
        <div className="w-[72px]">
          <NavigationSidebar/>
        </div>
        <ServerSiderbar serverId={serverId}/>
      </SheetContent>
    </Sheet>
  )
}