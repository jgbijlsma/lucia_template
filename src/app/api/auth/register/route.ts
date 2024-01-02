import createServerErrorResponse from "@/util/createServerErrorResponse";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

export async function POST(req: NextRequest) {
  const { username, password, passwordVerify } = (await req.json()) as {
    username: string | undefined;
    password: string | undefined;
    passwordVerify: string | undefined;
  };

  let messages: string[] = [];

  if (!username || !password || !passwordVerify) {
    messages.push("Please enter all required fields.");
    return createServerErrorResponse(messages, 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (existingUser)
    messages.push("An account with this username already exists.");

  if (password.length < 8)
    messages.push("Please enter a password of at least 8 characters long.");

  if (password !== passwordVerify)
    messages.push("Please enter the same password twice for verification.");

  if (messages.length > 0) return createServerErrorResponse(messages, 400);

  try {
    const user = await auth.createUser({
      attributes: { username: username },
      key: {
        password: password,
        providerId: "username",
        providerUserId: username.toLowerCase(),
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    await auth.deleteDeadUserSessions(session.user.userId);

    const authContext = auth.handleRequest(req.method, context);
    authContext.setSession(session);

    return new NextResponse();
  } catch (error) {
    console.error(error);

    messages = ["Something went wrong on the server."];

    return createServerErrorResponse(messages, 500);
  }
}
