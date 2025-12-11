import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function IfElseSetting({ selectNode, updateFormData }: any) {
    const [formData, setFormData] = useState({ ifCondition: "" })
    useEffect(() => {
        selectNode && setFormData(selectNode.data.settings)
    }, [selectNode])
    return (
        <div>
            <h2 className='font-bold'>If/Else</h2>
            <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
            <div className='mt-3'>
                <Label>If</Label>
                <Input placeholder='Enter condition e.g output=`any condition`' onChange={e => setFormData({ ifCondition: e.target.value })} value={formData?.ifCondition ?? ""} />
            </div>
            <Button className='w-full mt-5' onClick={() => { updateFormData(formData), toast.success("Updated") }}>Save</Button>

        </div>
    )
}
