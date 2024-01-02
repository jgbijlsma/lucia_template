import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function inverseProtectedPage() {
  const authContext = auth.handleRequest("GET", context);
  const session = await authContext.validate();

  if (session) redirect("/");
  else return session;
}
