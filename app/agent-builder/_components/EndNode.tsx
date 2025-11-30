import { Handle, Position } from '@xyflow/react'
import { Play } from 'lucide-react'
import React from 'react'

export default function EndNode() {
    return (
        <div className='bg-white  rounded-2xl p-2 px-3 border'>
            <div className='flex gap-2 items-center'>
                <Play className='p-2 rounded-lg h-8 w-8 bg-yellow-100' />
                <h2>End</h2>
                <Handle type="target" position={Position.Left} />
                {/* <Handle type="target" position={Position.Bottom} /> */}
            </div>
        </div>
    )
}
