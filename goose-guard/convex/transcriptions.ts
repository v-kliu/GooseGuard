import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTranscription = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("transcriptions", { transcription: args.text });
    return await ctx.db.get(id)
  },
});