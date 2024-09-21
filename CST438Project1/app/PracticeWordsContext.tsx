// PracticeWordsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Word } from './/database/db-service';

interface PracticeWordsContextProps {
  practiceWords: Word[];
  setPracticeWords: React.Dispatch<React.SetStateAction<Word[]>>;
}

const PracticeWordsContext = createContext<PracticeWordsContextProps | undefined>(undefined);

export const PracticeWordsProvider = ({ children }: { children: ReactNode }) => {
  const [practiceWords, setPracticeWords] = useState<Word[]>([]);

  return (
    <PracticeWordsContext.Provider value={{ practiceWords, setPracticeWords }}>
      {children}
    </PracticeWordsContext.Provider>
  );
};

export const usePracticeWords = () => {
  const context = useContext(PracticeWordsContext);
  if (!context) {
    throw new Error('usePracticeWords must be used within a PracticeWordsProvider');
  }
  return context;
};