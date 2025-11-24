import { NextResponse, type NextRequest } from 'next/server';

const DEVICE_ID_COOKIE = 'device_id';
const DEVICE_CREATED_AT_COOKIE = 'device_created_at';
const DEVICE_ACTIVITY_COOKIE = 'device_activity_at';

export async function GET(request: NextRequest) {
  const deviceId = request.cookies.get(DEVICE_ID_COOKIE)?.value;
  const createdAt = request.cookies.get(DEVICE_CREATED_AT_COOKIE)?.value;
  const activityAt = request.cookies.get(DEVICE_ACTIVITY_COOKIE)?.value;

  if (!deviceId || !createdAt) {
    return NextResponse.json(
      { error: 'device_id_not_provisioned' },
      { status: 428 } // Precondition Required
    );
  }

  return NextResponse.json({
    deviceId,
    createdAt,
    lastActiveAt: activityAt ?? createdAt,
  });
}

