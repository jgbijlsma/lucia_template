import protectedPage from "@/lib/auth/protectedPage";

export default async function ProfilePage() {
  const session = await protectedPage();

  return (
    <main>
      <h1 className="mb-4 text-4xl">Profile</h1>

      <p>Username: {session.user.username}</p>
    </main>
  );
}
