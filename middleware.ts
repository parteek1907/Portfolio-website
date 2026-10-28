import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get("host") || "").toLowerCase();

  // Strip port from hostname (e.g., os.localhost:3000 -> os.localhost)
  const hostname = host.split(":")[0];

  // Determine if this request is targeting Parteek OS
  const isOsDomain =
    hostname === "os.parteekgarg.in" ||
    hostname === "os.localhost" ||
    hostname.startsWith("os.") ||
    hostname.startsWith("os-") ||
    url.searchParams.get("view") === "windows" ||
    url.searchParams.get("os") === "true" ||
    url.searchParams.get("subdomain") === "os";

  // Forward custom headers to Server Components and downstream handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hostname", hostname);
  requestHeaders.set("x-is-os", isOsDomain ? "1" : "0");

  if (isOsDomain) {
    // Rewrite to preserve the browser address bar strictly on os.parteekgarg.in
    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set("x-experience", "parteek-os");
    return response;
  }

  // Standard portfolio experience on parteekgarg.in, www.parteekgarg.in, localhost:3000
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("x-experience", "portfolio");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Static asset directories: icons, certificates, projects, wallpaper
     * - Well-known static meta files: favicon.ico, robots.txt, sitemap.xml, etc.
     */
    "/((?!_next/static|_next/image|icons/|certificates/|projects/|wallpaper/|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
