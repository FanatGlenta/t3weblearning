import { Button } from "~/components/ui/button";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";

export function NotFoundNews() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <Ban className="h-16 w-16 text-red-500" />
      <h1 className="text-3xl font-bold">Новость не найдена</h1>
      <p className="text-gray-500">
        Возможно, она была удалена или никогда не существовала.
      </p>
      <Button
        onClick={() => router.push("/iknt")}
        className="px-6 py-3 text-lg"
      >
        Вернуться на главную
      </Button>
    </div>
  );
}
