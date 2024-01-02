import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function protectedPage() {
  const authContext = auth.handleRequest("GET", context);
  const session = await authContext.validate();

  if (!session) redirect("/auth/logIn");
  else return session;
}
