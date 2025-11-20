import TaskBoard from '@/app/components/TaskBoard'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function AppHeader() {
  return (
    <div className='flex justify-between items-center shadow'>
      <SidebarTrigger />
      <div className='flex items-center justify-center gap-3'>
        <Link href={'/tasks'}>Tasks</Link>
        <UserButton />
      </div>
    </div>
  )
}
