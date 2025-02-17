"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
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
  const { t, i18n } = useTranslation();

  // Переключение языка
  const changeLanguage = (lang: "en" | "ru") => {
    i18n.changeLanguage(lang);
  };

  // Функция плавного скролла к якорю
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="absolute top-0 flex w-full items-center justify-between bg-[#191919] px-10 py-5 text-white">
      {/* Логотип */}
      <Link href="/">
        <Image src={Photo} alt="Логотип" width={200} height={70} />
      </Link>

      {/* Десктопное меню */}
      <div className="hidden items-center gap-10 md:flex">
        {links.map((item, index) => {
          if (item.action) {
            return (
              <button
                key={index}
                onClick={item.action}
                className="rounded-md bg-red-600 px-4 py-2 transition duration-300"
              >
                {t(item.title)}
              </button>
            );
          }

          if (item.link?.startsWith("#")) {
            return (
              <button
                key={item.link}
                onClick={() => scrollToSection(item.link!.substring(1))}
                className="text-xl transition duration-300"
              >
                {t(item.title)}
              </button>
            );
          }

          return (
            <Link
              key={item.link}
              href={item.link!}
              className="text-xl transition duration-300"
            >
              {t(item.title)}
            </Link>
          );
        })}

        {/* Переключатель языка (черная кнопка без ховера) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-16 border-none bg-[#191919] text-white shadow-none">
              {i18n.language.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-16 border-none bg-[#191919] text-white">
            <DropdownMenuItem
              className="flex justify-center bg-[#191919] text-center text-white"
              onClick={() => changeLanguage("en")}
            >
              EN
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-center bg-[#191919] text-center text-white"
              onClick={() => changeLanguage("ru")}
            >
              RU
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Бургер-меню */}
      <button
        className="text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#191919] p-5 transition-transform duration-300 md:hidden">
          {links.map((item, index) => {
            if (item.action) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.action && item.action();
                    setIsOpen(false);
                  }}
                  className="mt-4 w-[120px] rounded-md bg-red-600 py-3 text-center transition duration-300"
                >
                  {t(item.title)}
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
                  className="py-3 text-xl transition duration-300"
                >
                  {t(item.title)}
                </button>
              );
            }

            return (
              <Link
                key={item.link}
                href={item.link!}
                className="py-3 text-xl transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t(item.title)}
              </Link>
            );
          })}

          {/* Переключатель языка в мобильном меню */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-5 w-16 border-none bg-[#191919] text-white shadow-none">
                {i18n.language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 border-none bg-[#191919] text-white">
              <DropdownMenuItem
                className="bg-[#191919] text-white"
                onClick={() => changeLanguage("en")}
              >
                EN
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-[#191919] text-white"
                onClick={() => changeLanguage("ru")}
              >
                RU
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
}
