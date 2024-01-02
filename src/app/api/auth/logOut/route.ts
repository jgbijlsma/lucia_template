import { auth } from "@/lib/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import * as context from "next/headers";

export async function GET(req: NextRequest) {
  const authContext = auth.handleRequest(req.method, context);
  const session = await authContext.validate();
  if (session) {
    await auth.invalidateSession(session.sessionId);
    await auth.deleteDeadUserSessions(session.user.userId);
  }
  authContext.setSession(null);
  return new NextResponse();
}
