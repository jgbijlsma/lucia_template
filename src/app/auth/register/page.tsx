import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
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
