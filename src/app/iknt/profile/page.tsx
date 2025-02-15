"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteNews } from "~/services/getNews";
import { Card } from "~/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TeacherCard from "~/components/iknt/TeacherCard";
import { deleteTeacher, fetchTeachers, Teacher } from "~/services/getTeachers";
import AddTeacherForm from "~/components/iknt/AddTeacherForm";
import EditTeacherForm from "~/components/iknt/EditTeacherForm";

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
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user) {
      router.push("/iknt/registration");
      return;
    }

    // Загружаем новости
    fetch("/api/iknt/news/getNews")
      .then((res) => res.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch((error) => console.error("Ошибка при загрузке новостей:", error));

    // Загружаем преподавателей
    fetchTeachers()
      .then((data) => setTeachers(data))
      .catch((error) =>
        console.error("Ошибка при загрузке преподавателей:", error),
      );
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
        {/* Блок профиля */}
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
            className="mt-4 w-4/12 rounded-lg bg-[#AF0909] px-6 py-2 text-white"
            onClick={() => signOut()}
          >
            Выйти
          </Button>
        </div>

        {/* Вкладки "Новости" и "Преподаватели" */}
        <div className="relative ml-6 flex w-2/3 flex-col rounded-lg border border-[#6d6d6d] bg-[#272727] p-6 shadow-lg">
          <Tabs defaultValue="news">
            <TabsList className="mb-4 flex rounded-lg bg-[#1e1e1e] p-1">
              <TabsTrigger
                value="news"
                className="flex-1 rounded-md px-4 py-2 text-white transition-colors hover:bg-[#333] data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Ваши Новости
              </TabsTrigger>
              <TabsTrigger
                value="teachers"
                className="flex-1 rounded-md px-4 py-2 text-white transition-colors hover:bg-[#333] data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Преподаватели
              </TabsTrigger>
            </TabsList>

            {/* Вкладка Новости */}
            <TabsContent value="news">
              <div
                className="flex-grow overflow-y-auto pr-2"
                style={{ maxHeight: "550px" }}
              >
                {news.length > 0 ? (
                  news.map((n) => (
                    <Card
                      key={n.id}
                      className="mb-4 rounded-lg bg-[#191919] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                          {n.title}
                        </h3>
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
            </TabsContent>

            {/* Вкладка Преподаватели */}
            <TabsContent value="teachers">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <Card
                      key={teacher.id}
                      className="relative flex flex-col items-center rounded-lg bg-[#191919] p-4"
                    >
                      <TeacherCard
                        name={teacher.name}
                        position={teacher.position}
                        image={teacher.imageUrl}
                      />
                      <div className="absolute right-2 top-2 flex gap-2">
                        {/* Кнопка редактирования */}
                        <Button
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-600"
                          onClick={() => setEditingTeacher(teacher)}
                        >
                          <Edit2 className="h-5 w-5" />
                        </Button>

                        {/* Кнопка удаления */}
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:text-red-800"
                          onClick={async () => {
                            const success = await deleteTeacher(teacher.id);
                            if (success) {
                              setTeachers((prevTeachers) =>
                                prevTeachers.filter((t) => t.id !== teacher.id),
                              );
                            }
                          }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400">Преподавателей пока нет.</p>
                )}
              </div>

              <div className="absolute bottom-4 right-4">
                <Dialog
                  open={isTeacherDialogOpen}
                  onOpenChange={setIsTeacherDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-black shadow-lg transition">
                      +
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить преподавателя</DialogTitle>
                    </DialogHeader>
                    <AddTeacherForm
                      onClose={() => setIsTeacherDialogOpen(false)}
                      onTeacherAdded={(newTeacher: Teacher) =>
                        setTeachers([newTeacher, ...teachers])
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>

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

          {editingTeacher && (
            <Dialog
              open={!!editingTeacher}
              onOpenChange={() => setEditingTeacher(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Редактировать преподавателя</DialogTitle>
                </DialogHeader>
                <EditTeacherForm
                  teacher={editingTeacher}
                  onClose={() => setEditingTeacher(null)}
                  onTeacherUpdated={(updatedTeacher) => {
                    setTeachers((prevTeachers) =>
                      prevTeachers.map((t) =>
                        t.id === updatedTeacher.id ? updatedTeacher : t,
                      ),
                    );
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
