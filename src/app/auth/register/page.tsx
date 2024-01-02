import RegisterForm from "@/components/auth/RegisterForm";
import inverseProtectedPage from "@/lib/auth/inverseProtectedPage";
import Link from "next/link";

export default async function RegisterPage() {
  await inverseProtectedPage();

  return (
    <main>
      <h1 className="text-4xl">Register</h1>

      <RegisterForm />

      <Link href="/auth/logIn" className="text-blue-500 hover:underline">
        Log in instead
      </Link>
    </main>
  );
}
