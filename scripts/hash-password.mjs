#!/usr/bin/env node
// Generates an ADMIN_PASSWORD_HASH value for .env.local / Vercel env vars.
// Usage: node scripts/hash-password.mjs "new password"
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`${salt}:${hash}`);
