import { WorkflowContext } from '@/context/WorkflowContext';
import { AgentTools, AgentType } from '@/utils/AgentType'
import React, { useContext } from 'react'

export default function AgentToolsPanel() {
    const { addedNodes, setAddedNodes } = useContext(WorkflowContext)
    function onAgentToolClick(element: AgentType): void {
        const newNode = {
            id: `${element.id}-${Date.now()}`,
            position: { x: 0, y: 100 },
            data: {
                label: element.name,

                bgColor: element.bgColor,
                id: element.id,
                type: element.type
            },
            type: element.type
        }
        setAddedNodes((prev: any) => [...prev, newNode])

    }

    return (
        <div className='bg-white p-5 rounded-2xl shadow'>
            <h2 className='font-semibold mb-4 text-gray-700'>
                AI Agent Tools
            </h2>
            <div>
                {AgentTools.map((element, index) => (
                    <div key={index} className='flex items-center  gap-3 cursor-pointer hover:bg-gray-100 p-2' onClick={() => onAgentToolClick(element)}>
                        <element.icon className='p-2 rounded-lg h-8 w-8' style={{
                            backgroundColor: element.bgColor
                        }} />
                        <h2 className='text-sm font-medium text-gray-700'>{element.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
