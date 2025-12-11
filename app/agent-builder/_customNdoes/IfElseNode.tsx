import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Merge } from 'lucide-react'
import React from 'react'

export default function IfElseNode({ data }: any) {
    console.log(data);
    
    return (
        <div className='bg-white  rounded-2xl p-2 px-3 border'>
            <div className='flex gap-2 items-center'>
                <Merge className='p-2 rounded-lg h-8 w-8 ' style={{
                    backgroundColor: data?.bgColor!
                }} />
               <div className='flex flex-col'>
                    <h2>{data!.lable}</h2>
                    <p className='text-xs text-gray-500'>{data!.lable}</p>
                </div>

            </div>
            <div className='max-w-60 flex flex-col gap-2'>
                <Input className='text-sm bg-white' disabled placeholder='If Condition' />
                <Input className='text-sm bg-white' disabled placeholder='Else Condition' />
            </div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} id={"if"} />
            <Handle type="source" position={Position.Right} id={"else"} style={{
                top: 110
            }} />

        </div>
    )
}
