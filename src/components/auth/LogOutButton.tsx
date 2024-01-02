"use client";

export default function LogOutButton() {
  async function onClick() {
    await fetch("/api/auth/logOut");

    location.replace("/");
  }

  return (
    <button onClick={onClick} className="text-blue-500 hover:underline">
      Log out
    </button>
  );
}
