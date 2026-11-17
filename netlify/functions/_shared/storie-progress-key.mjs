import {createHash} from 'node:crypto';

// Stable local bookmark namespace, never a credential or proof of purchase.
// Same account/video/mode on a newly paired TV gets the same key, with no email
// or Identity token sent to the TV. Playback authorization stays independent.
export function progressKey(userId, videoId, testMode) {
  return createHash('sha256').update(JSON.stringify(['storie-resume-v1',userId,videoId||'',!!testMode])).digest('hex');
}
