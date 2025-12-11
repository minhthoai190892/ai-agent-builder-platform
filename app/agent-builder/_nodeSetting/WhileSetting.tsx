import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function WhileSetting({ selectNode, updateFormData }: any) {
    const [formData, setFormData] = useState({ whileCondition: "" })
    useEffect(() => {
        selectNode && setFormData(selectNode.data.settings)
    }, [selectNode])
    return (
        <div> <h2 className='font-bold'>While</h2>
            <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
            <div className='mt-3'>
                <Label>While</Label>
                <Input placeholder='Enter condition e.g output=`any condition`' onChange={e => setFormData({ whileCondition: e.target.value })} value={formData?.whileCondition ?? ""} />
            </div>
            <Button className='w-full mt-5' onClick={() => { updateFormData(formData), toast.success("Updated") }}>Save</Button>

        </div>
    )
}
