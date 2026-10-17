import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type WishlistContextValue = {
  items: string[];
  toggleItem: (name: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function toggleWishlistItem(items: string[], name: string) {
  return updateWishlistItem(items, name, !items.includes(name));
}

export function updateWishlistItem(items: string[], name: string, saved: boolean) {
  if (saved) {
    return items.includes(name) ? items : [...items, name];
  }
  return items.filter((item) => item !== name);
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedItems: unknown = JSON.parse(window.localStorage.getItem("ecanteen-wishlist") ?? "[]");
      if (Array.isArray(savedItems) && savedItems.every((item): item is string => typeof item === "string")) {
        setItems(savedItems);
      }
    } catch {
      setItems([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        window.localStorage.setItem("ecanteen-wishlist", JSON.stringify(items));
      } catch {
        // Keep wishlist interactions usable when browser storage is unavailable.
      }
    }
  }, [items, loaded]);

  function toggleItem(name: string) {
    setItems((current) => toggleWishlistItem(current, name));
  }

  return <WishlistContext.Provider value={{ items, toggleItem }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}