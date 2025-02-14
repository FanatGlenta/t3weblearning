"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Photo from "~/assets/logoIKNT.png";

interface NavLink {
  title: string;
  link?: string;
  action?: () => void;
}

interface NavbarProps {
  brand: { title: string; link: string };
  links: readonly NavLink[];
}

export default function Navbar({ brand, links }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Функция плавного скролла к якорю
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50, // отступ сверху (можно изменить)
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="absolute top-0 flex w-full items-center justify-between bg-[#191919] px-10 py-10 text-white">
      {/* Логотип */}
      <Link href="/">
        <Image src={Photo} alt="Логотип" width={255} height={85} />
      </Link>

      {/* Десктопное меню */}
      <div className="hidden gap-10 md:flex">
        {links.map((item, index) => {
          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className="rounded-md bg-red-600 px-4 py-2 transition duration-300 hover:bg-red-500"
              >
                {item.title}
              </button>
            );
          }

          if (item.link?.startsWith("#")) {
            return (
              <button
                key={item.link}
                onClick={() => scrollToSection(item.link!.substring(1))}
                className="text-2xl transition duration-300 hover:text-gray-200"
              >
                {item.title}
              </button>
            );
          }

          return (
            <Link
              key={item.link}
              href={item.link!}
              className="text-2xl transition duration-300 hover:text-gray-200"
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Кнопка бургера */}
      <button
        className="text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#191919] p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        aria-hidden={!isOpen}
      >
        {/* Кнопка закрытия меню */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Menu"
          className="absolute right-5 top-5 text-white transition duration-300 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Ссылки в мобильном меню */}
        {links.map((item, index) => {
          if (item.action) {
            return (
              <button
                key={index}
                onClick={() => {
                  item.action && item.action();
                  setIsOpen(false);
                }}
                className="mt-4 w-[120px] rounded-md bg-red-600 py-3 text-center transition duration-300 hover:bg-red-500"
              >
                {item.title}
              </button>
            );
          }

          if (item.link?.startsWith("#")) {
            return (
              <button
                key={item.link}
                onClick={() => {
                  scrollToSection(item.link!.substring(1));
                  setIsOpen(false);
                }}
                className="py-3 text-xl transition duration-300 hover:text-gray-200"
              >
                {item.title}
              </button>
            );
          }

          return (
            <Link
              key={item.link}
              href={item.link!}
              className="py-3 text-xl transition duration-300 hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
