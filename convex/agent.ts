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