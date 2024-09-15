import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTranscription = mutation({
  args: { transcription: v.string(), scam: v.boolean() },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("transcriptions", { transcription: args.transcription, scam: args.scam });
    return await ctx.db.get(id)
  },
});