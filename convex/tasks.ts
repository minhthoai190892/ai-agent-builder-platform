import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSectionsWithTasks = query({
    handler: async (ctx) => {
        const sections = await ctx.db.query("sections").order("asc").collect();
        const tasks = await ctx.db.query("tasks").collect();

        return sections.map((section) => ({
            ...section,
            tasks: tasks.filter((t) => t.sectionId === section._id),
        }));
    },
});

export const addSection = mutation({
    args: { title: v.string() },
    handler: async (ctx, args) => {
        const count = await ctx.db.query("sections").collect();
        await ctx.db.insert("sections", {
            title: args.title,
            order: count.length + 1,
        });
    },
});

export const addTask = mutation({
    args: { sectionId: v.id("sections"), title: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("tasks", {
            title: args.title,
            done: false,
            sectionId: args.sectionId,
        });
    },
});
/**
 * Hàm thay đổi trạng thái của hoàn thành / chưa hoàn thành
 * đối số nhận vào là id của task và giá trị done
 * 
 */
export const toggleTask = mutation({
    args: { id: v.id("tasks"), done: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { done: args.done });
    },
});
