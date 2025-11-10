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
});