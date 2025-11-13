import { Id } from "@/convex/_generated/dataModel"

export interface UserType {
    email: string,
    name: string,
    token: number,
    _creationTime: number,
    _id: Id<"userTable">
}