"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Navbar from "~/components/Navbar";

type NavLink = { title: string; link?: string; action?: () => void };

function getNavLinks(isAuthenticated: boolean): NavLink[] {
  return isAuthenticated
    ? [
        { title: "Каталог", link: "/shop" },
        { title: "О компании", link: "/shop/about" },
        { title: "Корзина", link: "/shop/cart" },
        { title: "Профиль", link: "/shop/profile" },
      ]
    : [
        { title: "О компании", link: "/shop/about" }, // Добавляем ссылку для гостей
        { title: "Вход", link: "/shop/login" },
        { title: "Регистрация", link: "/shop/registration" },
      ];
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [shopLinks, setShopLinks] = useState<NavLink[]>([]);

  useEffect(() => {
    setShopLinks(getNavLinks(status === "authenticated"));
  }, [status]);

  return (
    <>
      <Navbar key={session?.user?.id || "guest"} links={shopLinks} />
      <div className="bg-gray-100">{children}</div>
    </>
  );
}
