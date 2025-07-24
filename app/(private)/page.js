"use client"; // Required if you're using the App Router

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/orders"); // or router.push("/orders") if you want it in history
  }, [router]);

  return null;
}
