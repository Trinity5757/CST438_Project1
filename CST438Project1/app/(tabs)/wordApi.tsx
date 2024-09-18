import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const WordApi: React.FC = () => {
  const [words, setWords] = useState<any>(null);
  const [randomWords, setRandomWords] = useState<string | null>(null);

  // To generate the random word.
  const getRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      const json = await response.json();
      setRandomWords(json[0]); // Assuming json[0] is the word
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  // To get the random word's definition.
  const getWords = async (word: string) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const json = await response.json();
      setWords(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRandomWord();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (randomWords) {
      getWords(randomWords);
    }
  }, [randomWords]);

  if (!randomWords) {
    return <Text>Please try loading a new random word</Text>;
  } else if (!words) {
    return <Text>There is no available definition for this word.</Text>;
  }

  return (
    <View>
      <Text>Random Word: {randomWords}</Text>
      <Text>Definition: {words[0]?.meanings[0]?.definitions[0]?.definition || 'No definition available'}</Text>
    </View>
  );
};

export default WordApi;
