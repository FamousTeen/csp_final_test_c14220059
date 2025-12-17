import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@/utils/supabase/middleware";

const PROTECTED_ROUTES = ["/dashboard"];
const GUEST_ONLY_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createMiddlewareClient(request, response);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!session && isProtected) {
    return buildRedirectResponse(response, request, "/login");
  }

  const isGuestOnly = GUEST_ONLY_ROUTES.includes(pathname);
  if (session && isGuestOnly) {
    return buildRedirectResponse(response, request, "/dashboard");
  }

  return response;
}

function buildRedirectResponse(
  sourceResponse: NextResponse,
  request: NextRequest,
  destination: string,
) {
  const redirectUrl = new URL(destination, request.url);
  const redirectResponse = NextResponse.redirect(redirectUrl, { status: 303 });

  sourceResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
