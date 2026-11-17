import {problem} from './storie-stripe.mjs';

export function cloudflareMovie({env, fetcher = fetch, now = Date.now}) {
  function settings() {
    const account = (env('CF_STREAM_ACCOUNT_ID') || '').trim();
    const video = (env('CF_STREAM_VIDEO_ID') || '').trim();
    const host = (env('CF_STREAM_HOST') || '').trim().replace(/^https:\/\//,'').replace(/\/$/,'');
    const apiToken = (env('CF_STREAM_API_TOKEN') || '').trim();
    if (!/^[a-f0-9]{32}$/i.test(account) || !/^[a-f0-9]{32}$/i.test(video) ||
        !/^customer-[a-z0-9-]+\.cloudflarestream\.com$/i.test(host) || !apiToken) {
      throw problem('cloudflare_configuration','La sala è in preparazione. Riprova più tardi.');
    }
    return {account,video,host,apiToken};
  }
  async function api(config, suffix = '', payload) {
    const response = await fetcher(`https://api.cloudflare.com/client/v4/accounts/${config.account}/stream/${config.video}${suffix}`, {
      method: payload ? 'POST' : 'GET',
      headers: {Authorization:'Bearer '+config.apiToken,'Content-Type':'application/json'},
      ...(payload ? {body:JSON.stringify(payload)} : {}), signal: AbortSignal.timeout(10000),
    });
    const data = await response.json().catch(()=>null);
    if (!response.ok || !data?.success || !data.result) {
      throw problem('cloudflare_unavailable','Il servizio video non è disponibile. Riprova tra poco.');
    }
    return data.result;
  }
  async function ready(origin) {
    const config = settings();
    const video = await api(config);
    if (!video.readyToStream || video.status?.state === 'error') throw problem('video_not_ready','Il documentario è ancora in elaborazione. Riprova più tardi.');
    if (video.requireSignedURLs !== true) throw problem('video_not_protected','La sala è in preparazione. Riprova più tardi.');
    // Prevent accidental playback on the wrong site while preserving signed URLs as primary protection.
    const hosts = video.allowedOrigins || [];
    const hostname = new URL(origin).hostname;
    if (!hosts.length || !hosts.some(rule => rule === hostname || (rule.startsWith('*.') && hostname.endsWith(rule.slice(1))))) {
      throw problem('video_origin_not_allowed','Il video non è disponibile su questo indirizzo. Riprova dal sito Genova mApp.');
    }
    return {config, duration:Number(video.duration)||0};
  }
  async function playback(origin) {
    const {config,duration} = await ready(origin);
    const lifetime = Math.min(6*60*60, Math.max(3*60*60, Math.ceil(duration)+60*60));
    const exp = Math.floor(now()/1000)+lifetime;
    const signed = await api(config,'/token',{exp,downloadable:false});
    if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(signed.token || '')) {
      throw problem('video_token_unavailable','Impossibile avviare il video. Riprova.');
    }
    const url = new URL(`https://${config.host}/${signed.token}/iframe`);
    url.searchParams.set('autoplay','true');url.searchParams.set('primaryColor','#e9bf73');
    url.searchParams.set('letterboxColor','#000000');
    return {provider:'cloudflare',url:url.href,until:exp*1000};
  }
  return {ready,playback};
}
