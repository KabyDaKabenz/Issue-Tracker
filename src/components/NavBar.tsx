"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  DropdownMenu,
  Flex,
  Text,
  Link as StyleLink,
} from "@radix-ui/themes";
import Skeleton from "./Skeleton";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Flex align="center" justify="between">
        <Link href="/">
          <AiFillBug />
        </Link>
        <Flex gap="6" align="center">
          <NavLinks />
          <AuthStatus />
        </Flex>
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul>
      <Flex gap="6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </Flex>
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status == "loading")
    return <Skeleton circle width="1.7rem" height="1.7rem" />;

  if (status === "unauthenticated")
    return (
      <StyleLink className="nav-link" onClick={() => signIn()}>
        Login
      </StyleLink>
    );

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <StyleLink
            className="text-gray-700"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <DropdownMenu.Item>Log out</DropdownMenu.Item>
          </StyleLink>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default NavBar;
