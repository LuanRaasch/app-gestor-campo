import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function auth(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedRoutes = ["/atividades", "/clientes", "/usuarios"]; // rotas privadas

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
