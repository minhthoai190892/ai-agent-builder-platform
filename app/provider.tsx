"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { UserType } from '@/utils/UserType'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
interface ProviderProps {
    children: React.ReactNode
}
export default function Provider({ children }: ProviderProps) {
    const { user } = useUser()
    const [userDetail, setUserDetail] = useState<UserType | null>(null)
    const createNewUser = useMutation(api.user.createNewUser)
    const createAndGetUser = async () => {
        if (user) {
            const result = await createNewUser({
                name: user.fullName ?? "",
                email: user.primaryEmailAddress?.emailAddress ?? "",
            })
            // console.log(result);
            setUserDetail(result)

        }
    }
    useEffect(() => {
        user && createAndGetUser()
    }, [user])
    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <div>
                {children}
            </div>
        </UserDetailContext.Provider>
    )
}
