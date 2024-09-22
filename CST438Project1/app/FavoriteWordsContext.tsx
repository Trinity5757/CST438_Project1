import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Word } from './/database/db-service';

interface FavoriteWordsContextProps {
  favoriteWords: Word[];
  setFavoriteWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

const FavoriteWordsContext = createContext<FavoriteWordsContextProps | undefined>(undefined);

export const FavoriteWordsProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteWords, setFavoriteWords] = useState<Word[]>([]);

  return (
    <FavoriteWordsContext.Provider value={{ favoriteWords, setFavoriteWords }}>
      {children}
    </FavoriteWordsContext.Provider>
  );
};

export const useFavoriteWords = () => {
  const context = useContext(FavoriteWordsContext);
  if (!context) {
    throw new Error('useFavoriteWords must be used within a FavoriteWordsProvider');
  }
  return context;
};
