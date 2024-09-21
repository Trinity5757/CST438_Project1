import React, { useState, forwardRef, useImperativeHandle, useCallback, useRef } from 'react';
import { Text, View } from 'react-native';

type WordApiProps = {
  onWordChange: (word: string, definition: string) => void;
};

export type WordApiRef = {
  fetchNewWord: () => Promise<string>;
  getCurrentWord: () => { word: string; definition: string } | null;
};

const WordApi = forwardRef<WordApiRef, WordApiProps>(function WordApi(props, ref) {
  const [currentWord, setCurrentWord] = useState<{ word: string; definition: string } | null>(null);
  const internalRef = useRef<{ word: string; definition: string } | null>(null);

  const getRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      const json = await response.json();
      console.log("Random word fetched:", json);
      return json[0];
    } catch (error) {
      console.error('Error fetching random word:', error);
      return null;
    }
  };

  const getDefinition = async (word: string) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const json = await response.json();
      console.log("Definition fetched:", json);
      if (json.length > 0 && json[0].meanings.length > 0) {
        return json[0].meanings[0].definitions[0].definition;
      }
      return '';
    } catch (error) {
      console.error('Error fetching definition:', error);
      return '';
    }
  };

  const fetchNewWord = useCallback(async () => {
    console.log("fetchNewWord called in WordApi");
    const word = await getRandomWord();
    if (word) {
      const definition = await getDefinition(word);
      const newWord = { word, definition };
      setCurrentWord(newWord);
      internalRef.current = newWord;
      props.onWordChange(word, definition);
      console.log("New word set in WordApi:", newWord);
      return `${word}: ${definition}`;
    }
    return '';
  }, [props]);

  const getCurrentWord = useCallback(() => {
    console.log("getCurrentWord called in WordApi, returning:", internalRef.current);
    return internalRef.current;
  }, []);

  useImperativeHandle(ref, () => ({
    fetchNewWord,
    getCurrentWord,
  }), [fetchNewWord, getCurrentWord]);

  console.log("WordApi rendered. Current word:", currentWord);

  return (
    <View>
      <Text>Current Word: {currentWord ? currentWord.word : 'None'}</Text>
      <Text>Definition: {currentWord ? currentWord.definition : 'None'}</Text>
    </View>
  );
});

export default WordApi;