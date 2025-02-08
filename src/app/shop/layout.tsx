"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";
import { useCartStore } from "~/store/useCartStore";

type NavLink = { title: string; link?: string; action?: () => void };

function getNavLinks(isAuthenticated: boolean, cartCount: number): NavLink[] {
  return isAuthenticated
    ? [
        { title: "Каталог", link: "/shop" },
        { title: "О компании", link: "/shop/about" },
        {
          title: `Корзина (${cartCount})`, // Добавляем счетчик товаров
          link: "/shop/cart",
        },
        { title: "Профиль", link: "/shop/profile" },
      ]
    : [
        { title: "О компании", link: "/shop/about" },
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
  const { cart, fetchCart } = useCartStore(); // Берем корзину из zustand
  const [shopLinks, setShopLinks] = useState<NavLink[]>([]);

  // Загружаем корзину, если пользователь авторизован
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchCart(session.user.id);
    }
  }, [status, session?.user?.id, fetchCart]);

  // Обновляем навигацию при изменении корзины или статуса авторизации
  useEffect(() => {
    setShopLinks(getNavLinks(status === "authenticated", cart.length));
  }, [status, cart.length]);

  return (
    <>
      <Navbar key={session?.user?.id || "guest"} links={shopLinks} />
      <div className="bg-gray-100">{children}</div>
    </>
  );
}
