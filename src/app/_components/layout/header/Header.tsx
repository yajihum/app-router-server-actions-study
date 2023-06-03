import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import LinkList from "./LinkList";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <nav className="flex justify-between p-2">
        <div className="flex">
          <Link href={"/"} className="p-2 text-sm font-semibold md:text-2xl">
            🍊ChatLife
          </Link>
          <LinkList />
        </div>
        <div>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              userProfileMode="navigation"
              userProfileUrl="/account"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="rounded bg-blue-500 p-3 text-white hover:bg-blue-400">
                サインイン
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
