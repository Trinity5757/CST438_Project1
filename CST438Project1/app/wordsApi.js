import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Text, View } from 'react-native';

const WordApi = forwardRef((props, ref) => {
  const [words, setWords] = useState(null);
  const [randomWords, setRandomWords] = useState(null);

  const getRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      const json = await response.json();
      setRandomWords(json[0]);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getWords = async (word) => {
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
    getRandomWord();
  }, []);

  useEffect(() => {
    if (randomWords) {
      getWords(randomWords);
    }
  }, [randomWords]);

  useImperativeHandle(ref, () => ({
    fetchNewWord: getRandomWord,
  }));

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
});

export default WordApi;
