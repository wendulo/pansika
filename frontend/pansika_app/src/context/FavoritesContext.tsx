import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Favorite = {
  id: number;
  name: string;
  image_url?: string;
  price: number;
  unit: string;
  storeName: string;
};

type FavContextType = {
  favourites: Favorite[];
  toggleFavourite: (item: Favorite) => void;
  isFavourite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavContextType>({
  favourites: [],
  toggleFavourite: () => {},
  isFavourite: () => false
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Favorite[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("favourites").then(saved => {
      if (saved) setFavourites(JSON.parse(saved));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (item: Favorite) => {
    setFavourites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavourite = (id: number) => favourites.some(f => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
