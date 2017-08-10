import injectSession from './injectSession';
import ensureSignedIn from './ensureSignedIn';
import compose from '../utils/compose';

// Use the typical `Page` middleware and redirect to `/sign-in` when there's
// no session.
export default compose(injectSession, ensureSignedIn)
