import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";

export default async function getPageSession() {
  const authContext = auth.handleRequest("GET", context);
  const session = await authContext.validate();

  return session;
}
