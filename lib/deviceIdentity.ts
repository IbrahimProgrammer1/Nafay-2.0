const DEVICE_ID_STORAGE_KEY = 'nafay_device_identity';

export interface DeviceIdentity {
  deviceId: string;
  createdAt: string;
  lastActiveAt: string;
}

export function getCachedDeviceIdentity(): DeviceIdentity | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DeviceIdentity;
  } catch {
    window.localStorage.removeItem(DEVICE_ID_STORAGE_KEY);
    return null;
  }
}

export async function ensureDeviceIdentity(): Promise<DeviceIdentity> {
  if (typeof window === 'undefined') {
    throw new Error('ensureDeviceIdentity must run in the browser');
  }

  const response = await fetch('/api/device', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to load device identity');
  }

  const identity = (await response.json()) as DeviceIdentity;
  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, JSON.stringify(identity));
  return identity;
}

export function clearCachedDeviceIdentity() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(DEVICE_ID_STORAGE_KEY);
}

