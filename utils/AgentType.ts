import { Merge, MousePointer2, Repeat, Square, ThumbsUp, Webhook } from "lucide-react";
import React from "react";

export interface AgentType {
    name: string,
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    bgColor: string,
    id: string,
    type: string
}
export const AgentTools: AgentType[] = [
    {
        name: "Agent",
        icon: MousePointer2,
        bgColor: "#cdf7e3",
        id: "agent",
        type: "AgentNode"
    },
    {
        name: "End",
        icon: Square,
        bgColor: "#FFF3CD",
        id: "end",
        type: "EndNode"
    },
    {
        name: "If/Else",
        icon: Merge,
        bgColor: "#FFF3CD",
        id: "ifElse",
        type: "IfElseNode"
    },
    {
        name: "While",
        icon: Repeat,
        bgColor: "#cdf7e3",
        id: "while",
        type: "WhileNode"
    },
    {
        name: "User Approval",
        icon: ThumbsUp,
        bgColor: "#cdf7e3",
        id: "approval",
        type: "UserApprovalNode"
    },
    {
        name: "API",
        icon: Webhook,
        bgColor: "#cdf7e3",
        id: "api",
        type: "ApiNode"
    },

]