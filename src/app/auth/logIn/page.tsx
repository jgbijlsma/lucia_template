import LogInForm from "@/components/auth/LogInForm";
import Link from "next/link";

export default function LogInPage() {
  return (
    <main>
      <h1 className="text-4xl">Log in</h1>

      <LogInForm />

      <Link href="/auth/register" className="text-blue-500 hover:underline">
        Register instead
      </Link>
    </main>
  );
}
