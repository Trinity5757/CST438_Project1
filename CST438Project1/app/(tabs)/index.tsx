import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image, StyleSheet, Button, View, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WordApi, {WordApiRef} from '../wordsApi';
import { openDatabase, createUserTable, createWordTable, getUser, createUser, createPracticeWord, createFavoriteWord, getPracticeWords, getFavoriteWords, User, Word} from '../database/db-service';
import { openDatabaseAsync, openDatabaseSync } from 'expo-sqlite';
import { PracticeWordsProvider, usePracticeWords } from '../PracticeWordsContext';
import { FavoriteWordsProvider, useFavoriteWords } from '../FavoriteWordsContext';


export default function HomeScreen() {
  const { setPracticeWords } = usePracticeWords();
  const { setFavoriteWords } = useFavoriteWords();


  const [signedIn, setSignedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [currentWord, setCurrentWord] = useState<{ word: string; definition: string } | null>(null);

  const wordApiRef = useRef<WordApiRef>(null);

  const setupDatabase = async () => {
    try {
      const db = await openDatabase('words.db');
      await createUserTable(db);
      await createWordTable(db);
    } catch (error) {
    }
  };

  useEffect(() => {
    setupDatabase();
  }, []);

  useEffect(() => {
    if (signedIn) {
      console.log("User is signed in, calling handleNewWord");
      handleNewWord();
    }
  }, [signedIn]);

  const handleNewWord = useCallback(async () => {
    console.log("handleNewWord called in HomeScreen");
    if (wordApiRef.current) {
      try {
        const newWordString = await wordApiRef.current.fetchNewWord();
        
        const currentWordObj = wordApiRef.current.getCurrentWord();
        
        if (currentWordObj) {
          setCurrentWord(currentWordObj);
          console.log("Current word state updated in HomeScreen:", currentWordObj);
        } else {
        }
      } catch (error) {
        console.error("Error in handleNewWord:", error);
      }
    } else {
      console.error("wordApiRef is not available in HomeScreen");
    }
  }, []);

  const handlePracticeWords = useCallback(async () => {
    console.log("handlePracticeWords called. SignedIn:", signedIn, "CurrentWord:", currentWord);

    const updatedCurrentWord = wordApiRef.current?.getCurrentWord();
    if (!updatedCurrentWord) {
      console.error("Still no current word after fetch attempt");
      return;
    }

    try {
      const db = await openDatabase('words.db');
      const newWord: Word = {
        word: updatedCurrentWord.word,
        definition: updatedCurrentWord.definition,
        username: username,
        list: 'practice'
      };
      await createPracticeWord(db, [newWord]);
      console.log("Word added to practice:", newWord);

      const practiceWords = await getPracticeWords(db, username);
      console.log("Practice words for user", username, ":");
      practiceWords.forEach((word, index) => {
        console.log(`${index + 1}. ${word.word}: ${word.definition}`);
      });

      setPracticeWords(practiceWords);

      handleNewWord();
    } catch (error) {
      console.error("Can't add word to practice", error);
    }
  }, [signedIn, currentWord, username, handleNewWord, setPracticeWords]);

  
  const handleSignIn = async () => {
    try {
      console.log("Starting handleSignIn function");
      const db = await openDatabase('words.db');
      console.log("Database opened successfully");

      const newUser: User = {username, password: 'your_password_here'};
      console.log("New user object created:", newUser);

      await createUser(db, [newUser]);
      console.log("User created successfully");

      setSignedIn(true);
      setShowLogin(false);
      console.log("User signed in, signedIn state set to true");

      const users = await getUser(db);
      console.log("Users in database:", users);

      console.log("handleSignIn function completed successfully");
    } catch (error) {
      console.error("Error in handleSignIn function:", error);
    }
  };

  const toggleSignIn = () => {
    if (signedIn) {
      setSignedIn(false);
      setUsername('');
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };
  
  const handleFavoriteWords = useCallback(async () => {
    console.log("handleFavoriteWords called. SignedIn:", signedIn, "CurrentWord:", currentWord);

    const updatedCurrentWord = wordApiRef.current?.getCurrentWord();
    if (!updatedCurrentWord) {
      console.error("Still no current word after fetch attempt");
      return;
    }

    try {
      const db = await openDatabase('words.db');
      const newWord: Word = {
        word: updatedCurrentWord.word,
        definition: updatedCurrentWord.definition,
        username: username,
        list: 'favorite'
      };
      await createFavoriteWord(db, [newWord]);
      console.log("Word added to favorite:", newWord);

      const favoriteWords = await getFavoriteWords(db, username);
      console.log("Favorite words for user", username, ":");
      favoriteWords.forEach((word, index) => {
        console.log(`${index + 1}. ${word.word}: ${word.definition}`);
      });

      setFavoriteWords(favoriteWords);

      handleNewWord();
    } catch (error) {
      console.error("Can't add word to favorite", error);
    }
  }, [signedIn, currentWord, username, handleNewWord, setFavoriteWords]);

  return (
    <FavoriteWordsProvider>
    <PracticeWordsProvider>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.headerContent}>
        <Button title={signedIn ? "Sign Out" : "Login"} onPress={toggleSignIn} />
      </View>

      {showLogin && !signedIn && (
        <View style={styles.signInContainer}>
          <ThemedText type="subtitle">Login</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          <Button title="Submit" onPress={handleSignIn} />
        </View>
      )}

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Word of the Day! {"\n"}
          <WordApi 
        ref={wordApiRef}
        onWordChange={(word: string, definition: string) => {
          setCurrentWord({ word, definition });
          console.log("Word changed:", { word, definition });
        }}
      />
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button 
          title="Add to Practice" 
          onPress={handlePracticeWords} 
        />
        <Button 
          title="Add to Favorite" 
          onPress={handleFavoriteWords} 
        />
      </ThemedView>
      <Button title="Randomize" onPress={handleNewWord} />
    </ParallaxScrollView>
    </PracticeWordsProvider>
    </FavoriteWordsProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContent: {
    padding: 16,
    alignItems: 'flex-end',
  },
  signInContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginTop: 16,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});