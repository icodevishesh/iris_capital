// Simple session auth for the admin portal. Credentials are hardcoded via env
// vars (ADMIN_USERNAME / ADMIN_PASSWORD). A successful login sets an httpOnly
// cookie whose value is an HMAC signature that both the API routes and the
// proxy (middleware) can verify. Uses Web Crypto so it runs on the edge too.

export const SESSION_COOKIE = "iris_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

const SECRET =
  process.env.ADMIN_SESSION_SECRET || "insecure-dev-secret-change-me";
// Signed payload is constant — the token proves "I logged in with the secret".
const PAYLOAD = "iris-admin";

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toHex(sig);
}

export async function createSessionToken(): Promise<string> {
  return sign(PAYLOAD);
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const expected = await sign(PAYLOAD);
  // Constant-length compare.
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "iris@admin2026";
  return username === expectedUser && password === expectedPass;
}
