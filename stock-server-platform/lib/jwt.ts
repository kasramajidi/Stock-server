import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const ISSUER = "stock-server";
const AUDIENCE = "stock-server-app";
const EXPIRY_DAYS = 15;

function getSecret() {
  if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return new TextEncoder().encode(JWT_SECRET);
}

export interface JwtPayload {
  sub: string; // userId
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * توکن JWT با انقضای ۱۵ روز برای کاربر
 */
export async function createToken(userId: string): Promise<string> {
  const secret = getSecret();
  const exp = Math.floor(Date.now() / 1000) + EXPIRY_DAYS * 24 * 60 * 60;
  return new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
}

/**
 * بررسی و استخراج payload از توکن JWT
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const secret = getSecret();
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const sub = payload.sub;
    if (!sub) return null;
    return {
      sub,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
      iss: payload.iss ?? ISSUER,
      aud: payload.aud as string ?? AUDIENCE,
    };
  } catch {
    return null;
  }
}
