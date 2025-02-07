import Link from "next/link";
import Navbar from "~/components/Navbar";

const homeLinks = [
  { title: "Интернет-магазин", link: "/shop" },
  { title: "Калькулятор", link: "/lab2" },
  { title: "Сайт ИКНТ", link: "/iknt" },
] as const;

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col bg-gray-100 text-gray-900">
      <Navbar links={homeLinks} />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md">
            Лабораторные работы
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Выберите лабораторную работу, чтобы начать изучение.
          </p>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {homeLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="relative flex h-20 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <span className="absolute inset-0 rounded-xl bg-white opacity-10 transition-opacity duration-300 hover:opacity-20"></span>
                <span className="relative z-10 px-6 text-center">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
