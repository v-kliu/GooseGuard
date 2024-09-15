// convex/functions/storeTokens.ts

import { mutation } from '../_generated/server';

export default mutation(async ({ db }, { accessToken, refreshToken }) => {
  await db.insert('gmail_tokens', { accessToken, refreshToken });
});
