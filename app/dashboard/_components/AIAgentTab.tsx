import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import MyAgents from './MyAgents'

export default function AIAgentTab() {
    return (
        <div className='px-10 md:px-24 lg:px-32 mt-14'>
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="myAgetn">My Agent</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="myAgetn"><MyAgents /></TabsContent>
                <TabsContent value="templates">Templates</TabsContent>
            </Tabs>
        </div>
    )
}
