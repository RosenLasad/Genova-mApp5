import { authenticatedUser, isDeletedUser, json, readUserRecord } from './_shared/billing-store.mjs';
import { cloudflareMovie } from './_shared/storie-cloudflare.mjs';

const VIDEOS = new Map([
  ['borgo-incrociati', {
    full: 'fecefe2d898360c5fee81017d79d7044',
    preview: '48bffe02ff14969d9c0038342f263581',
  }],
]);

export default async function minidocPlayback(request) {
  if (request.method !== 'POST') return json({error:'method_not_allowed'}, 405);
  const page = new URL(request.url);
  const video = VIDEOS.get(page.searchParams.get('id'));
  if (!video) return json({error:'minidoc_not_found'}, 404);

  try {
    const env = key => Netlify.env.get(key);
    const user = await authenticatedUser(request);
    if (user?.id && !(await isDeletedUser(user.id))) {
      const record = await readUserRecord(user.id);
      const subscription = record?.subscription;
      if (subscription?.status === 'active' && subscription.simulated === false &&
          (!subscription.currentPeriodEnd || Number(subscription.currentPeriodEnd) > Date.now())) {
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
