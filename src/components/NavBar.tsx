import Link from "next/link";
import LogOutButton from "./auth/LogOutButton";

export default function NavBar() {
  return (
    <nav className="flex justify-between mb-4">
      <div className="space-x-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/protected" className="text-blue-500 hover:underline">
          Protected
        </Link>
      </div>
      <div className="space-x-4">
        <Link href="/auth/profile" className="text-blue-500 hover:underline">
          Profile
        </Link>
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </Link>
        <Link href="/auth/logIn" className="text-blue-500 hover:underline">
          Log in
        </Link>
        <LogOutButton />
      </div>
    </nav>
  );
}
