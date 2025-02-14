// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import Input from "~/components/Input";
// import Button from "~/components/Button";

// interface AuthFormProps {
//   title: string;
//   buttonText: string;
//   linkText: string;
//   linkTo: string;
//   isRegister?: boolean;
// }

// const AuthForm: React.FC<AuthFormProps> = ({
//   title,
//   buttonText,
//   linkText,
//   linkTo,
//   isRegister = false,
// }) => {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (isRegister && form.password !== form.passwordConfirm) {
//       setError("Пароли не совпадают");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (isRegister) {
//         const response = await fetch("/api/shop/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Ошибка при регистрации");
//         }
//       }

//       // Используем next-auth для входа
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: form.email,
//         password: form.password,
//       });

//       if (result?.error) {
//         throw new Error(result.error);
//       }

//       router.push("/shop/profile");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-96 rounded-lg bg-white p-8 shadow-md">
//         <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
//           {title}
//         </h2>

//         {error && (
//           <p className="mb-4 text-center text-sm text-red-600">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {isRegister && (
//             <Input
//               type="text"
//               name="name"
//               placeholder="Имя"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="password"
//             name="password"
//             placeholder="Пароль"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           {isRegister && (
//             <Input
//               type="password"
//               name="passwordConfirm"
//               placeholder="Подтвердите пароль"
//               value={form.passwordConfirm}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <Button
//             type="submit"
//             text={loading ? "Загрузка..." : buttonText}
//             disabled={loading}
//           />
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           {linkText}{" "}
//           <a href={linkTo} className="font-bold text-blue-600">
//             Нажмите сюда
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Loader from "~/components/Loader";

interface AuthFormProps {
  title: string;
  buttonText: string;
  linkText: string;
  linkTo: string;
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  linkText,
  linkTo,
  isRegister = false,
}) => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isRegister && form.password !== form.passwordConfirm) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        const response = await fetch("/api/shop/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Ошибка при регистрации");
        }
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/iknt/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center text-2xl font-bold text-gray-800">
          {title}
        </CardHeader>

        <CardContent>
          {error && (
            <p className="mb-4 text-center text-sm text-red-600">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <Input
                type="text"
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
            />
            {isRegister && (
              <Input
                type="password"
                name="passwordConfirm"
                placeholder="Подтвердите пароль"
                value={form.passwordConfirm}
                onChange={handleChange}
                required
              />
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader /> : buttonText}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {linkText}{" "}
            <a href={linkTo} className="font-bold text-blue-800">
              Нажмите сюда
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
