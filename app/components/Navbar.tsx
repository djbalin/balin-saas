import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "@/components/ui/button";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="flex border-b bg-background h-[10vh] items-center">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="font-bold text-3xl">JBalin</h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggler />
          {/* <div className="flex items-center gap-x-5"> */}
          {user ? (
            <Button>
              <LogoutLink>Hello {user.given_name}, Sign out?</LogoutLink>
            </Button>
          ) : (
            <>
              <Button>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button variant={"secondary"}>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
