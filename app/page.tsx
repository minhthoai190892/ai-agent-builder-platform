"use client"
import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  // const tasks = useQuery(api.tasks.get);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      dsfasf
      <UserButton />
    </main>
  );

}
