import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function EndSetting({ selectNode, updateFormData }: any) {
  const [formData, setFormData] = useState({ schema: "" })
  useEffect(() => {
    selectNode && setFormData(selectNode?.data?.settings)
  }, [selectNode])
  return (
    <div>
      <h2 className='font-bold'>EndNode</h2>
      <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet.</p>
      <div className='mt-2 space-y-2'>
        <label >Output</label>
        <Textarea placeholder='{name:string}' onChange={e => setFormData({ schema: e.target.value })} value={formData?.schema??""} />
      </div>
      <Button className='w-full mt-5' onClick={() => {updateFormData(formData),toast.success("Updated")}}>Save</Button>

    </div>
  )
}
