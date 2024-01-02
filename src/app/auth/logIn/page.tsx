import LogInForm from "@/components/auth/LogInForm";
import inverseProtectedPage from "@/lib/auth/inverseProtectedPage";
import Link from "next/link";

export default async function LogInPage() {
  await inverseProtectedPage();

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
