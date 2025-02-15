"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteNews } from "~/services/getNews";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import AddNewsForm from "~/components/iknt/AddNewsForm";
import Loader from "~/components/Loader";
import { Edit2, Trash2 } from "lucide-react";
import EditNewsForm from "~/components/iknt/EditNewsForm";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  previewImageUrl: string;
  images: string[];
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/iknt/registration");
      return;
    }

    fetch("/api/iknt/news/getNews")
      .then((res) => res.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch((error) => console.error("Ошибка при загрузке новостей:", error));
  }, [session, status, router]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#191919] text-white">
      {/* Навигация */}
      <div className="flex w-full items-center justify-between px-40 py-10">
        <div className="font-golos text-6xl">Профиль</div>
        <a href="/iknt" className="flex items-center text-3xl text-white">
          Главная <span className="ml-2">→</span>
        </a>
      </div>

      <div className="flex w-full max-w-6xl px-6">
        {/* Блок профиля (фиксированная высота 360px) */}
        <div className="flex h-[320px] w-1/3 flex-col justify-between rounded-lg border border-white bg-transparent p-6 shadow-lg">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">О себе</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">Имя</label>
                <div className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-white">
                  {session.user.name ?? "Не указано"}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Почта
                </label>
                <div className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2 text-white">
                  {session.user.email ?? ""}
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="destructive"
            className="mt-4 w-full rounded-lg bg-red-600 px-6 py-2 text-white"
            onClick={() => signOut()}
          >
            Выйти
          </Button>
        </div>

        {/* Блок новостей (фиксированная высота 625px, с прокруткой) */}
        <div
          className="relative ml-6 flex w-2/3 flex-col rounded-lg border border-[#6d6d6d] bg-[#272727] p-6 shadow-lg"
          style={{ height: "625px" }}
        >
          <h2 className="mb-4 text-2xl font-semibold">Ваши новости</h2>
          <div
            className="flex-grow overflow-y-auto pr-2"
            style={{ maxHeight: "550px" }}
          >
            {news.length > 0 ? (
              news.map((n) => (
                <Card key={n.id} className="mb-4 rounded-lg bg-[#191919] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{n.title}</h3>
                    <div className="flex gap-2">
                      {/* Кнопка редактирования */}
                      <Button
                        variant="ghost"
                        className="p-2 text-blue-400 hover:text-blue-600"
                        onClick={() => setEditingNews(n)}
                      >
                        <Edit2 className="h-5 w-5" />
                      </Button>

                      {/* Кнопка удаления */}
                      <Button
                        variant="ghost"
                        className="p-2 text-red-600 hover:text-red-800"
                        onClick={async () => {
                          const success = await deleteNews(n.id);
                          if (success) {
                            setNews((prevNews) =>
                              prevNews.filter((item) => item.id !== n.id),
                            );
                          }
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="line-clamp mt-2 text-sm text-gray-400">
                    {n.description}
                  </p>
                </Card>
              ))
            ) : (
              <p className="text-gray-400">Новостей пока нет.</p>
            )}
          </div>

          {/* Модальное окно для редактирования */}
          {editingNews && (
            <Dialog
              open={!!editingNews}
              onOpenChange={() => setEditingNews(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Редактировать новость</DialogTitle>
                </DialogHeader>
                <EditNewsForm
                  newsItem={editingNews}
                  onClose={() => setEditingNews(null)}
                  onNewsUpdated={(updatedNews) => {
                    setNews((prevNews) =>
                      prevNews.map((item) =>
                        item.id === updatedNews.id ? updatedNews : item,
                      ),
                    );
                  }}
                />
              </DialogContent>
            </Dialog>
          )}

          {/* Кнопка добавления новости (фиксирована внизу блока новостей) */}
          <div className="absolute bottom-4 right-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg">
                  +
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить новость</DialogTitle>
                </DialogHeader>
                <AddNewsForm
                  onClose={() => setIsDialogOpen(false)}
                  onNewsAdded={(newNews: NewsItem) =>
                    setNews([newNews, ...news])
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
