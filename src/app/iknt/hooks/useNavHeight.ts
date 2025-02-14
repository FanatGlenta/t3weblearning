import { useEffect, useState } from "react";

export function useNavHeight() {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight(); // Устанавливаем начальное значение

    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  return navHeight;
}
