import { Id } from "@/convex/_generated/dataModel";

export interface Agent {
    _id: Id<"AgentTable">,
    name: string,
    config?: any,
    published: boolean,
    _creationTime: number,
    nodes?: any,
    edges?: any,
    userId: Id<"userTable">,
}