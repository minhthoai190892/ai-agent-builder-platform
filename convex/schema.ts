import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    sections: defineTable({
        title: v.string(),
        order: v.number(),
    }),
    tasks: defineTable({
        title: v.string(),
        done: v.boolean(),
        sectionId: v.id("sections"), // Liên kết section
    }),
    userTable: defineTable({
        name: v.string(),
        email: v.string(),
        subscription: v.optional(v.string()),
        token: v.number()

    }),
    AgentTable: defineTable({
        name: v.string(),
        config: v.optional(v.any()),
        published: v.boolean(),
        userId: v.id("userTable")
    })
});
