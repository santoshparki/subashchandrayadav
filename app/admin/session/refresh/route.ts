import { NextRequest, NextResponse } from "next/server";
import { clearSession, getSession, refreshAdminSession } from "@/lib/auth";

function getSafeNextUrl(request: NextRequest) {
  const requestedNext = request.nextUrl.searchParams.get("next") || "/admin";
  const nextPath = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/admin";
  return new URL(nextPath, request.url);
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    await clearSession();
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const refreshed = await refreshAdminSession();
  if (!refreshed) {
    await clearSession();
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.redirect(getSafeNextUrl(request));
}
