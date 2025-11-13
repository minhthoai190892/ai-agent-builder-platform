"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { UserDetailContext } from "@/context/UserDetailContext"
import { Database, Gem, Headphones, LayoutDashboard, User2, Wallet } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useContext } from "react"
export interface MenuOptionType {
    title: string,
    url: string,
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
export function AppSidebar() {
    const menuOption: MenuOptionType[] = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "AI Agens",
            url: "/dashboard/test",
            icon: Headphones
        },
        {
            title: "Data",
            url: "#",
            icon: Database
        }
        , {
            title: "Pricing",
            url: "#",
            icon: Wallet
        }, {
            title: "Profile",
            url: "#",
            icon: User2
        }
    ]
    const { open } = useSidebar()
    const userDetail = useContext(UserDetailContext)
    const path = usePathname()
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {open && <h2 className="text-2xl font-bold">Agentify</h2>}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuOption.map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton asChild isActive={path === item.url ? true : false}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-10" >
                <div className="flex gap-2 items-center
         ">
                    <Gem />
                    {open && <h2>Remaining credits: <span className="font-bold">{userDetail?.userDetail?.token}</span></h2>}
                </div>
                {open && <Button>Upgrade to Unlimited</Button>}
            </SidebarFooter>
        </Sidebar>
    )
}


