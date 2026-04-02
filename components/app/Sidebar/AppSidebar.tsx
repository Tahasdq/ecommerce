import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { items } from "@/lib/constants"
import Image from "next/image"
import logo from "@/assets/logo.svg";


export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-10 flex justify-center">
          <Image width={70} height={60} alt="logo" src={logo} />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-20">
            <SidebarMenu>
              {items?.map((item,index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="text-2xl" size={"lg"} asChild>
                    {/* <a href={item.url}> */}
                      <span className="cursor-pointer">{item.name}</span>
                    {/* </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}