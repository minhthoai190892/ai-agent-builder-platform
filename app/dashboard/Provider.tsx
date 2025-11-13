import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
interface DashboardProviderProps {
    children: React.ReactNode
}
export default function DashboardProvider({ children }: DashboardProviderProps) {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <div className='w-full '>

                    <AppHeader />
                    {children}
                </div>
            </SidebarProvider>
        </div>
    )
}
