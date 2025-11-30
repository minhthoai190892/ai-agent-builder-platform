import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createAgent = mutation({
    args: {
        name: v.string(),
        userId: v.id("userTable")
    }, async handler(ctx, args) {
        const result = await ctx.db.insert("AgentTable", {
            name: args.name,
            published: false,
            userId: args.userId
        })
        return result
    }
})

export const getUserAgents = query({
    args: {
        userId: v.id("userTable")
    }, async handler(ctx, args) {
        const result = await ctx.db.query("AgentTable").filter(q => q.eq(q.field("userId"), args.userId)).order("asc").collect()
        return result
    },

})

export const getAgentById = query({
    args: {

        agentId: v.string()
    }, async handler(ctx, args) {
        const resulut = await ctx.db.query("AgentTable").filter(q => q.eq(q.field("_id"), args.agentId)).order("desc").collect()
        return resulut[0]
    },
})
export const updateAgentDetail = mutation({
    args: {
        id: v.id("AgentTable"),
        nodes: v.any(),
        edges: v.any()
    }, async handler(ctx, args) {
        console.log(args.edges);

        await ctx.db.patch(args.id, {
            edges: args.edges,
            nodes: args.nodes
        })
        return await ctx.db.get(args.id); // return document sau khi cập nhật
    },
})