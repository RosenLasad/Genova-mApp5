import { getDeployStore } from '@netlify/blobs';
import { authenticatedUser, deletedUserStore } from './_shared/billing-store.mjs';
import { createHandler } from './_shared/storie-genova-service.mjs';

export default createHandler({
  // Pairing is isolated per deployment; existing account and Stripe data are untouched.
  storeFactory: () => getDeployStore({ name: 'storie-genova-pair-v1', consistency: 'strong' }),
  authenticate: authenticatedUser,
  isDeleted: async id => !!await deletedUserStore().get(`deleted-${id}`, { type: 'json' }),
});
export const config = {
  rateLimit: { action: 'rate_limit', aggregateBy: ['ip', 'domain'], windowSize: 60, windowLimit: 90 },
};
