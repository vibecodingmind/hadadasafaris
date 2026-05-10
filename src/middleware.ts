import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(ar|zh|nl|en|fr|de|it|pt|ru|es)/:path*',
  ],
};
