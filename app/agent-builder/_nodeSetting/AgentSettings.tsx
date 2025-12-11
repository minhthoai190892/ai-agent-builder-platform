import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { FileJson2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
interface AgentDetail {
    name: string,
    instruction: string,
    includeHistory: boolean,
    model: string,
    output: string,
    schema: string,
}

export default function AgentSettings({ selectNode, updateFormData }: any) {
    const [formData, setFormData] = useState<AgentDetail>({
        name: '',
        instruction: "",
        includeHistory: true,
        model: "gemini-flash-1.5",
        output: "text",
        schema: ''
    })
    const handleChange = <K extends keyof AgentDetail>(key: K, value: AgentDetail[K]) => {
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
        selectNode && setFormData(selectNode.data.settings)
    }, [selectNode])
    return (
        <div>
            <h2 className='font-bold'>Agent</h2>
            <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
            <div className='mt-3  space-y-1'>
                <Label>Name</Label>
                <Input placeholder='Agent Name' onChange={e => handleChange("name", e.target.value)} value={formData?.name ?? ""} />
            </div>
            <div className='mt-3  space-y-1'>
                <Label>Instruction</Label>
                <Textarea placeholder='Instruction' onChange={e => handleChange("instruction", e.target.value)} value={formData?.instruction ?? ""} />
                <h2 className='text-sm flex p-1 gap-2 items-center'>Add Context <FileJson2 className='w-4 h-4' /></h2>
            </div>
            <div className='mt-3  flex p-1 gap-2 items-center justify-between'>
                <Label>Include Chat History</Label>
                <Switch checked={formData?.includeHistory} onCheckedChange={e => handleChange("includeHistory", e)} />
            </div>
            <div className='flex items-center justify-between mt-4'>
                <Label>
                    Model
                </Label>
                <Select onValueChange={e => handleChange("model", e)} value={formData?.model ?? ""}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="gemini flash 1.5" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gemini-flash-1.5">Gemini flash 1.5</SelectItem>
                        <SelectItem value="gemini-pro-1.5">Gemini Pro 1.5</SelectItem>
                        <SelectItem value="gemini-pro-2.0">Gemini Pro 2.0</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2 mt-3'>
                <Label>Output Format</Label>
                <Tabs defaultValue="Text" className="w-[400px]" onValueChange={e => handleChange("output", e)} value={formData?.output ?? ""}>
                    <TabsList>
                        <TabsTrigger value="Text">Text</TabsTrigger>
                        <TabsTrigger value="Json">Json</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Text">
                        <h2 className='text-sm text-gray-500'>Output will be Text</h2></TabsContent>
                    <TabsContent value="Json">
                        <Label className='text-sm text-gray-500'>
                            Enter Json Schema.
                        </Label>
                        <Textarea placeholder='{title:string}' className='max-w-[300px]' onChange={e => handleChange("schema", e.target.value)} value={formData?.schema ?? ""}></Textarea>
                    </TabsContent>
                </Tabs>
            </div>
            <Button className='w-full mt-5' onClick={onSave}>Save</Button>
        </div>
    )
}
