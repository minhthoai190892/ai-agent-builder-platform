"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

export default function CreateAgentSection() {
    const router = useRouter()

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [agentName, setAgentName] = useState<string>("")
    const createAgentMutation = useMutation(api.agent.createAgent)
    const [loading, setLoading] = useState<boolean>(false)
    const user = useContext(UserDetailContext)

    const createAgent = async () => {
        if (!agentName.trim()) return
        setLoading(true)
        try {
            if (!user?.userDetail?._id) {
                return
            }
            const agentId = await createAgentMutation({
                name: agentName ?? "",
                userId: user?.userDetail?._id
            })
            setOpenDialog(false)
            setAgentName("")
            setLoading(false)
            router.push(`/agent-builder/${agentId}`)
            console.log(agentId);

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }
    return (
        <div className='space-x-2 flex justify-center items-center flex-col'>
            <h2 className='font-bold'>Craete AI Agent</h2>
            <p className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpenDialog(true)}><Plus /> Create</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader >
                        <DialogTitle>Enter Agent Name</DialogTitle>
                        <DialogDescription>
                            <Input placeholder='Enter Agent name' onChange={event => setAgentName(event.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"ghost"}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => createAgent()}>{loading ? <Loader2 className='animate-spin' /> : "Create"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
