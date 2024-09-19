import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Button, View, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WordApi from '../wordApi.js';

type WordApiRef = {
  fetchNewWord: () => void;
};

export type ToDoItem = {
  id: number;
  value: string;
};

export default function HomeScreen() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const wordApiRef = useRef<WordApiRef>(null);

  const toggleSignIn = () => {
    if (signedIn) {
      setSignedIn(false);
      setUsername('');
    } else {
      setShowSignIn(!showSignIn);
    }
  };

  const handleSignIn = () => {
    setSignedIn(true);
    setShowSignIn(false);
  };

  const AddToPractice = () => {
    //Add to Database
    handleNewWord();
  }

  const AddToFavorite = () => {
    //Add to Database
    handleNewWord();
  }

  const handleNewWord = () => {
    if (wordApiRef.current) {
      wordApiRef.current.fetchNewWord();
    }
  };

  return (
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
        <Button title={signedIn ? "Sign Out" : "Sign In"} onPress={toggleSignIn} />
      </View>
      
      {showSignIn && !signedIn && (
        <View style={styles.signInContainer}>
          <ThemedText type="subtitle">Sign In</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#888"
          />
          <Button title="Submit" onPress={handleSignIn} />
        </View>
      )}

      <ThemedView style={styles.titleContainer}>
        {/* Display the random word and definition from WordApi */}
        <ThemedText type="title">
          Word of the Day! {"\n"} 
          <WordApi ref={wordApiRef} />
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button title="Add to Practice" onPress={AddToPractice} />
        <Button title="Add to Favorite" onPress={AddToFavorite} />
      </ThemedView>
      <Button title="Randomize" onPress={handleNewWord} />
    </ParallaxScrollView>
  );
}

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