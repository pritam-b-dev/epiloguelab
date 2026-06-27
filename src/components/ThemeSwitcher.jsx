"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Moon, Sun } from "@gravity-ui/icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Button isIconOnly variant="flat" className="invisible opacity-0">
        <Sun />
      </Button>
    );
  }

  return (
    <Button
      isIconOnly
      variant="flat"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
