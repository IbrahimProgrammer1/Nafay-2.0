import { supabaseClient } from './supabaseClient';
import { ensureDeviceIdentity, getCachedDeviceIdentity } from './deviceIdentity';

export async function getDeviceId(): Promise<string> {
  const cached = getCachedDeviceIdentity();
  if (cached) {
    return cached.deviceId;
  }
  const identity = await ensureDeviceIdentity();
  return identity.deviceId;
}

export async function fetchWishlistIds() {
  const deviceId = await getDeviceId();
  const { data, error } = await supabaseClient
    .from('wishlists')
    .select('product_id')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((row) => row.product_id as string);
}

export async function fetchComparisonIds() {
  const deviceId = await getDeviceId();
  const { data, error } = await supabaseClient
    .from('comparisons')
    .select('product_id')
    .eq('device_id', deviceId)
    .order('added_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((row) => row.product_id as string);
}

export async function fetchRecentlyViewedIds(limit = 10) {
  const deviceId = await getDeviceId();
  const { data, error } = await supabaseClient
    .from('recently_viewed')
    .select('product_id')
    .eq('device_id', deviceId)
    .order('viewed_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((row) => row.product_id as string);
}

export async function addWishlistProduct(productId: string) {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('wishlists')
    .insert({
      device_id: deviceId,
      product_id: productId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  if (error) {
    throw new Error(error.message);
  }
}

export async function removeWishlistProduct(productId: string) {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('wishlists')
    .delete()
    .eq('device_id', deviceId)
    .eq('product_id', productId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function clearWishlistProducts() {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('wishlists')
    .delete()
    .eq('device_id', deviceId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function addComparisonProduct(productId: string) {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('comparisons')
    .insert({
      device_id: deviceId,
      product_id: productId,
      added_at: new Date().toISOString(),
    });
  if (error) {
    throw new Error(error.message);
  }
}

export async function removeComparisonProduct(productId: string) {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('comparisons')
    .delete()
    .eq('device_id', deviceId)
    .eq('product_id', productId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function clearComparisonProducts() {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('comparisons')
    .delete()
    .eq('device_id', deviceId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function upsertRecentlyViewedProduct(productId: string) {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('recently_viewed')
    .upsert(
      {
        device_id: deviceId,
        product_id: productId,
        viewed_at: new Date().toISOString(),
      },
      {
        onConflict: 'device_id,product_id',
      }
    );
  if (error) {
    throw new Error(error.message);
  }
}

export async function clearRecentlyViewedProducts() {
  const deviceId = await getDeviceId();
  const { error } = await supabaseClient
    .from('recently_viewed')
    .delete()
    .eq('device_id', deviceId);
  if (error) {
    throw new Error(error.message);
  }
}

