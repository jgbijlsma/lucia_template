import createServerErrorResponse from "@/util/createServerErrorResponse";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { LuciaError } from "lucia";

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as {
    username: string | undefined;
    password: string | undefined;
  };

  let messages: string[] = [];

  if (!username || !password) {
    messages.push("Please enter all required fields.");
    return createServerErrorResponse(messages, 400);
  }

  // add validation

  // if (messages.length > 0) return createServerErrorResponse(messages, 400);

  try {
    const key = await auth.useKey("username", username.toLowerCase(), password);

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });

    await auth.deleteDeadUserSessions(session.user.userId);

    const authContext = auth.handleRequest(req.method, context);
    authContext.setSession(session);

    return new NextResponse();
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      messages = ["Incorrect username and/or password."];
      return createServerErrorResponse(messages, 401);
    }

    console.error(error);

    messages = ["Something went wrong on the server."];

    return createServerErrorResponse(messages, 500);
  }
}
