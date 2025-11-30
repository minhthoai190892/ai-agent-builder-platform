import { Button } from '@/components/ui/button'
import { Agent } from '@/utils/Agent'
import { ChevronLeft, Code2, Play } from 'lucide-react'
import React from 'react'
type AgentBuilderHeaderProps = {
    agentDetail: Agent | undefined
}
export default function AgentBuilderHeader({ agentDetail }: AgentBuilderHeaderProps) {
    return (
        <div className='w-full p-3 flex items-center justify-between'>
            <div className='flex gap-2 items-center '>
                <ChevronLeft className='w-8 h-8' />
                <h2 className='text-xl font-bold'>{agentDetail?.name}</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <Button variant={"ghost"}> <Code2 />Code</Button>
                <Button><Play />Preview</Button>
                <Button>Publish</Button>
            </div>
        </div>
    )
}
