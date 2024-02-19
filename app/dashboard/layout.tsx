import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardNav from "../components/DashboardNav";
import { redirect } from "next/navigation";
import prisma from "../lib/db";

async function createUser({
  email,
  id,
  name,
}: {
  email: string;
  id: string;
  name: string;
}) {
  try {
    await prisma.user.create({
      data: {
        email: email,
        id: id,
        name: name,
      },
    });
  } catch (error) {
    console.error(error);
    alert("eyyy error happened while creating user");
  }
}

async function getUserData({
  email,
  id,
  given_name,
  family_name,
  picture,
}: {
  email: string;
  id: string;
  given_name: string | undefined | null;
  family_name: string | undefined | null;
  picture: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  const name = `${given_name ?? ""} ${family_name ?? ""}`;
  if (!user) {
    console.log("User doesn't exist in database. Creating ...");

    await createUser({ email, id, name });
  }

  return user;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getUserData({
    email: user.email as string,
    family_name: user.family_name as string,
    given_name: user.given_name as string,
    id: user.id,
    picture: user.picture as string,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
