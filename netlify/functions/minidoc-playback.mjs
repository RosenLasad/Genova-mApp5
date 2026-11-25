import { authenticatedUser, isAdminUser, isDeletedUser, json, readUserRecord } from './_shared/billing-store.mjs';
import { cloudflareMovie } from './_shared/storie-cloudflare.mjs';

const VIDEOS = new Map([
  ['borgo-incrociati', {
    full: 'fecefe2d898360c5fee81017d79d7044',
    preview: '48bffe02ff14969d9c0038342f263581',
  }],
  ['stazione-brignole', {full:'347957b4a4a99f2c6f8d6e7f5beb90cf', preview:'06edfd6dec14fdefab0b8085ef597faa'}],
  ['fronti-basse', {full:'0454a6f08d71a03879ebc7d85d7cb07d', preview:'a3ac6036f5316f67835b9446ae12e62d'}],
  ['cimitero-staglieno', {full:'3e34fcf29b6cc5a6446b70f79e480321', preview:'f00e7b2efbba0b228d8f5e344cb8c4a3'}],
  ['circonvallazione-a-monte', {full:'7a4b983851288c1dbb278a662a3ecff5', preview:'2f246a4488fc9d8846748e13494c74ca'}],
  ['borgo-ponticello', {full:'a61e0a5565554016da15b90ebd88b68b', preview:'bdae235c8ec200aa90fb84ec2f2825b8'}],
  ['stazione-principe', {full:'8075620f5580165cc9486a7e8314f757', preview:'7048faf5b628eef16883be6d9a693c0e'}],
  ['piazza-de-ferrari', {full:'a745f142e343897dadfd2f23be21af2e', preview:'dbf9137b8920fac476f381390d731e8c'}],
  ['viaxxsettembre', {full:'6adfe552449d723f6c4f03a0115e05fa', preview:'0f14913693f1105920d5537ac3992d58'}],
  ['parco-acquasola', {full:'01032b252320a1a900d1f477153c489a', preview:'2b33c21e871be26d63f1478d0dd5c74c'}],
  ['corso-italia', {full:'0b70ca4d93be38d59616d155944bc085', preview:'9def760a1b0911250bf056e1e864b246'}],
  ['seno-di-giano', {full:'0776f1773ebfd3c84aa0570df075857e', preview:'b40cb0597423f2a8c78a3416fd900dd3'}],
  ['borgo-piccapietra', {full:'bb2e1abfb45315e3afb1ca458e0859b5', preview:'a443e0583f1fba5f38a0180a840486f5'}],
  ['san-teodoro', {full:'2b5377284f6b075c021dcebd5f1dc7ba', preview:'d9b8a7c623e3b42fa8fd139d48a450b7'}],
  ['esposizione-universale-1914', {full:'2afb7fcf8b4a2af90457c72bdb4d75e7', preview:'fe689d5ad72520aae8f087498e9c5bdc'}],
]);

const SAN_TEODORO_VERSIONS = new Map([
  ['ar', {full:'fa425d91c89a82c4d704540c19a16981', preview:'3b363dd1a94ebcd47f546b4f3862b902'}],
  ['fr', {full:'c0421496239237e8cf69f7ddc910d9e4', preview:'79a2e6b7a2c53bb08eff6679a2d3e7ef'}],
  ['en', {full:'11efacbcdf569d0b93bec5dbd308e49d', preview:'30f9c707ecc3e2fe9b756b16413e84ae'}],
  ['es', {full:'1cc4ebec5aac63521a74113c6ee3d13b', preview:'da75e1af5ad740c1e45f15ff18bc9c78'}],
]);

export default async function minidocPlayback(request) {
  if (request.method !== 'POST') return json({error:'method_not_allowed'}, 405);
  const page = new URL(request.url);
  const id = page.searchParams.get('id');
  const language = page.searchParams.get('lang');
  const video = id === 'san-teodoro' && language && language !== 'it'
    ? SAN_TEODORO_VERSIONS.get(language)
    : VIDEOS.get(id);
  if (!video) return json({error:'minidoc_not_found'}, 404);

  try {
    const env = key => Netlify.env.get(key);
    const user = await authenticatedUser(request);
    if (user?.id && !(await isDeletedUser(user.id))) {
      const admin = isAdminUser(user);
      const subscription = admin ? null : (await readUserRecord(user.id))?.subscription;
      const active = subscription?.status === 'active' && subscription.simulated === false &&
        (!subscription.currentPeriodEnd || Number(subscription.currentPeriodEnd) > Date.now());
      if (admin || active) {
        const playback = await cloudflareMovie({env, videoId:video.full}).playback(page.origin);
        return json({...playback, mode:'full'});
      }
    }

    const playback = await cloudflareMovie({env, videoId:video.preview, preview:true}).playback(page.origin);
    return json({...playback, mode:'preview'});
  } catch (error) {
    console.warn('MiniDoc playback:', error?.code || error?.name || 'unavailable');
    return json({error:'minidoc_unavailable'}, 503);
  }
}
