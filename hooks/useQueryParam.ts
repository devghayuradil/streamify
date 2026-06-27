"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useQueryParam(key: string, defaultValue = "") {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState<string>(
    searchParams.get(key) ?? defaultValue
  );

  useEffect(() => {
    const current = new URLSearchParams(window.location.search);

    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    const qs = current.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
  }, [key, value, router]);

  return [value, setValue] as const;
}
