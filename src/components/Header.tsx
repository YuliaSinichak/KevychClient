"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { logoutFn } from "@/services/auth.service.api";
import { ModeToggle } from "@/components/ToggleTheme";

export default function Header() {
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(window.location.pathname === "/auth");
  }, []);

  const handleLogout = async () => {
    await logoutFn();
    window.location.reload();
  };

  return (
    <div className="flex w-auto m-4 gap-3 fixed">
      <ModeToggle />
      {!isAuthPage && <Button onClick={handleLogout}>Log out</Button>}
    </div>
  );
}
