import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

export function middleware(req: NextRequest) {
  return updateSession(req)
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"], // 인증이 필요한 경로 설정
};
