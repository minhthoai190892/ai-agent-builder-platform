"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { Agent } from '@/utils/Agent'
import { useConvex } from 'convex/react'
import moment from 'moment'
import { GitBranchPlus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyAgents() {
  const convext = useConvex()
  const [agentList, setAgentList] = useState<Agent[]>([])

  const user = useContext(UserDetailContext)
  useEffect(() => {
    user && getMyAgents()
  }, [user])
  const getMyAgents = async () => {
    if (!user?.userDetail?._id) {
      return
    }
    const result = await convext.query(api.agent.getUserAgents, {
      userId: user?.userDetail?._id
    })
    console.log(result);
    setAgentList(result)

  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        {agentList.map((agent, index) => (
         <Link key={index} href={`/agent-builder/${agent._id}`}>
          <div  className='p-3 border rounded-2xl shadow'>
            <GitBranchPlus className='bg-yellow-100 h-8 w-8 rounded-sm' />
            <h2 className='mt-3'>{agent.name}</h2>
            <h2 className='text-xl text-gray-400'>{moment(agent._creationTime).fromNow()}</h2>
          </div></Link>
        ))}
      </div>
    </div>
  )
}
