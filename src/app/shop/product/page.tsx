import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Товар {id}</h1>
    </main>
  );
}
