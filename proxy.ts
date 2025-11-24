import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEVICE_ID_COOKIE = 'device_id';
const DEVICE_CREATED_AT_COOKIE = 'device_created_at';
const DEVICE_ACTIVITY_COOKIE = 'device_activity_at';
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const existingDeviceId = request.cookies.get(DEVICE_ID_COOKIE)?.value;
  const existingCreatedAt = request.cookies.get(DEVICE_CREATED_AT_COOKIE)?.value;
  const nowIso = new Date().toISOString();

  let deviceId = existingDeviceId;
  let createdAt = existingCreatedAt;

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    createdAt = nowIso;
  }

  if (!createdAt) {
    createdAt = nowIso;
  }

  response.cookies.set({
    name: DEVICE_ID_COOKIE,
    value: deviceId,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: DEFAULT_MAX_AGE,
    path: '/',
  });

  response.cookies.set({
    name: DEVICE_CREATED_AT_COOKIE,
    value: createdAt,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: DEFAULT_MAX_AGE,
    path: '/',
  });

  response.cookies.set({
    name: DEVICE_ACTIVITY_COOKIE,
    value: nowIso,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: DEFAULT_MAX_AGE,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

