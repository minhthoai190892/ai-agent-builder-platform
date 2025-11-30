import { Button } from '@/components/ui/button'
import { Handle, Position } from '@xyflow/react'
import { ThumbsUp, User } from 'lucide-react'
import React from 'react'

export default function UserApprovalNode({ data }: any) {
    return (
        <div className='bg-white  rounded-2xl p-2 px-3 border'>
            <div className='flex gap-2 items-center'>
                <ThumbsUp className='p-2 rounded-lg h-8 w-8 ' style={{
                    backgroundColor: data?.bgColor!
                }} />
               <div className='flex flex-col'>
                    <h2>{data!.lable}</h2>
                    <p className='text-xs text-gray-500'>{data!.lable}</p>
                </div>

            </div>
            <div className='max-w-60 flex flex-col gap-2'>
                <Button>Approve</Button>
                <Button>Reject</Button>
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id={"approve"} />
            <Handle type="source" position={Position.Right} id={"reject"} style={{
                top: 110
            }} />

        </div>
    )
}
