import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isProtected = pathname.startsWith('/scan') && pathname !== '/scan/login' && !pathname.startsWith('/api/scan-auth');
  if (isProtected) {
    const authCookie = context.cookies.get('wba_scan_auth');
    const password = import.meta.env.SCAN_PASSWORD;
    if (!authCookie || authCookie.value !== password) {
      return context.redirect('/scan/login');
    }
  }
  return next();
});
