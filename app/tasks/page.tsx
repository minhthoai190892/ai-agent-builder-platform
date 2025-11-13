"use client"
import { useContext } from "react";
import TaskBoard from "../components/TaskBoard";
import { UserDetailContext } from "@/context/UserDetailContext";


export default function TaskPage() {
    const userDetail = useContext(UserDetailContext)
    console.log(userDetail);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <TaskBoard />
        </div>
    );
}
