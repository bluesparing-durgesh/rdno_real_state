"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compares, setCompares] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("endo_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error(e);
      }
    }

    const savedCompares = localStorage.getItem("endo_compares");
    if (savedCompares) {
      try {
        setCompares(JSON.parse(savedCompares));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      localStorage.setItem("endo_favorites", JSON.stringify(updated));
      // Dispatch custom event to notify other components (e.g. navbar count)
      window.dispatchEvent(new Event("endo_favorites_updated"));
      return updated;
    });
  };

  const toggleCompare = (id: string) => {
    setCompares((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((compId) => compId !== id);
      } else {
        if (prev.length >= 4) {
          // Limit to 4 comparison properties
          alert("You can compare up to 4 properties.");
          return prev;
        }
        updated = [...prev, id];
      }
      localStorage.setItem("endo_compares", JSON.stringify(updated));
      window.dispatchEvent(new Event("endo_compares_updated"));
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);
  const isCompare = (id: string) => compares.includes(id);

  return {
    favorites,
    compares,
    toggleFavorite,
    toggleCompare,
    isFavorite,
    isCompare,
  };
}
