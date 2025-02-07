import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg transition-transform hover:scale-105">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full rounded object-cover"
      />
      <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">Цена: {product.price}₽</p>
      <Link
        href={`/shop/product/${product.id}`}
        className="mt-2 block rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
      >
        Подробнее
      </Link>
    </div>
  );
}
