import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const password = data.get('password') as string;
  const correct = import.meta.env.SCAN_PASSWORD;
  if (password === correct) {
    cookies.set('wba_scan_auth', password, { path: '/', maxAge: 86400, httpOnly: true });
    return redirect('/scan');
  }
  return redirect('/scan/login?error=1');
};
