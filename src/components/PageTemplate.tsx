import Link from "next/link";
import Navbar from "~/components/Navbar";

interface PageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageTemplate({
  title,
  description,
  children,
}: PageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 text-gray-900">
      <div className="mt-10 w-full max-w-4xl px-4 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-lg text-gray-700">{description}</p>
      </div>
      <div className="mt-6 w-full flex-grow px-4">{children}</div>
    </main>
  );
}
