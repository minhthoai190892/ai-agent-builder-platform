import React from 'react'
import CreateAgentSection from './_components/CreateAgentSection'
import AIAgentTab from './_components/AIAgentTab'

export default function Dashboard() {
    return (
        <div>
            <CreateAgentSection />
            <AIAgentTab />
        </div>
    )
}
