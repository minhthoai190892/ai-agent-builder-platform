import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileJson2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface UserApprovalSettingType {
    name: string, message: string
}
export default function UserApprovalSetting({ selectNode, updateFormData }: any) {
    console.log(selectNode);

    const [formData, setFormData] = useState<UserApprovalSettingType>({ name: "", message: "" })
    const handleChange = <K extends keyof UserApprovalSettingType>(key: K, value: UserApprovalSettingType[K]) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))

    }
    const onSave = () => {
        updateFormData(formData)
        toast.success("Settings Updated")
    }
    useEffect(() => {
        selectNode && setFormData(selectNode?.data?.settings)
    }, [selectNode])
    return (
        <div>
            <h2 className='font-bold'>User Approval</h2>
            <p className='text-sm text-gray-400'>Describle the message to show to the user.</p>
            <div className='mt-3  space-y-1'>
                <Label>Name</Label>
                <Input placeholder='Name' onChange={e => handleChange("name", e.target.value)} value={formData?.name??""} />
            </div>
            <div className='mt-3  space-y-1'>
                <Label>Message</Label>
                <Textarea placeholder='Message...' onChange={e => handleChange("message", e.target.value)} value={formData?.message??""} />
            </div>
            <Button className='w-full mt-5' onClick={onSave}>Save</Button>

        </div>
    )
}
