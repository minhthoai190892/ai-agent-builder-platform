import { Handle, Position } from '@xyflow/react'
import { Play, Square } from 'lucide-react'
import React from 'react'

export default function EndNode({ data }: any) {
    console.log(data.bgColor);
    
    return (
        <div className='bg-white  rounded-2xl p-2 px-3 border'>
            <div className='flex gap-2 items-center'>
                <Square className='p-2 rounded-lg h-8 w-8 ' style={{
                    backgroundColor: data?.bgColor
                }} />
               <div className='flex flex-col'>
                    <h2>{data!.lable}</h2>
                    <p className='text-xs text-gray-500'>{data!.lable}</p>
                </div>
                <Handle type="target" position={Position.Left} />
                {/* <Handle type="target" position={Position.Bottom} /> */}
            </div>
        </div>
    )
}
