import React from 'react'
import DashboardProvider from './Provider'
interface DashboardLayoutProps {
    children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </div>
    )
}
