import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { FileJson2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface ApiSettingType {
    name: string,
    method: string,
    url: string,
    apiKey: string,
    includeApiKey: boolean,
    bodyParams: string
}
export default function ApiSetting({ selectNode, updateFormData }: any) {
    const [formData, setFormData] = useState<ApiSettingType>({
        name: '',
        method: "GET",
        url: "",
        apiKey: "",
        includeApiKey: true,
        bodyParams: ""
    })
    const handleChange = <K extends keyof ApiSettingType>(key: K, value: ApiSettingType[K]) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const onSave = () => {
        updateFormData(formData)
        toast.success("API Agent Settings Updated")
    }
    useEffect(() => {
        selectNode && setFormData(selectNode?.data?.settings)
    }, [selectNode])
    return (
        <div>
            <h2 className='font-bold'>API</h2>
            <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
            {/* Name */}
            <div className='mt-3 space-y-1'>
                <Label>Name</Label>
                <Input placeholder='API Agent Name' onChange={e => handleChange("name", e.target.value)} value={formData?.name??""} />

            </div>
            {/* Method */}
            <div className='mt-3 space-y-1 flex items-center justify-between'>
                <Label>Request Method</Label>
                <Select value={formData?.method} onValueChange={value => handleChange("method", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Method"></SelectValue>
                        <SelectContent>
                            <SelectItem value='GET'>GET</SelectItem>
                            <SelectItem value='POST'>POST</SelectItem>
                        </SelectContent>
                    </SelectTrigger>
                </Select>
            </div>
            {/* URL */}
            <div className='mt-3 space-y-1'>
                <Label>API URl</Label>
                <Input placeholder='https://api.example.com/data' onChange={e => handleChange("url", e.target.value)} value={formData?.url??""} />
            </div>
            {/* API Key */}
            <div className='mt-3 space-y-1'>
                <Label>Include API key</Label>
                <Switch checked={formData?.includeApiKey} onCheckedChange={e => handleChange("includeApiKey", e)} />

            </div>
            {/* Show input when user allow enter api key */}
            {
                formData?.includeApiKey && (
                    <div className='mt-3 space-y-1'>
                        <Label>API Key</Label>
                        <Input placeholder='Enter API Key' type='password' value={formData?.apiKey??""} onChange={e => handleChange("apiKey", e.target.value)} />
                    </div>
                )
            }
            {/* body params only for POST */}
            {formData?.method === "POST" && (
                <div className='mt-3 space-y-1'>
                    <Label>Parameters (JSON)</Label>
                    <Textarea placeholder='{"param1":"value1","param2":"value2"}' value={formData?.bodyParams??""} onChange={e => handleChange("bodyParams", e.target.value)} />
                    <h2 className='text-sm p-1 flex gap-2 items-center'>Add Body Params <FileJson2 className='h-3 w-3' /></h2>
                </div>
            )}
            <Button className='w-full mt-5' onClick={onSave}>Save</Button>

        </div>
    )
}
