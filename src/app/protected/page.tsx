import protectedPage from "@/lib/auth/protectedPage";
import prisma from "@/lib/prisma";

export default async function ProtectedPage() {
  const session = await protectedPage();

  const posts = await prisma.post.findMany({
    where: {
      user_id: session.user.userId,
    },
  });

  return (
    <main>
      <h1 className="text-4xl">Protected page</h1>

      {posts.map((post) => {
        return <div key={post.id}>{post.message}</div>;
      })}
    </main>
  );
}
