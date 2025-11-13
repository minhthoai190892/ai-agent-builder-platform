import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
    },
    async handler(ctx, args) {
        const user = await ctx.db.query("userTable").filter(q => q.eq(q.field('email'), args.email)).collect()
        if (user.length === 0) {
            const userData = {
                name: args.name,
                email: args.email,
                token: 5000
            }
            const userId = await ctx.db.insert("userTable", userData)
            const newUser = await ctx.db.get(userId)
            return newUser
        }
        return user[0]
    },
})