// PracticePage.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { usePracticeWords } from '../PracticeWordsContext';

const PracticePage = () => {
  const { practiceWords } = usePracticeWords();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Practice Page</Text>
      <FlatList
        data={practiceWords}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <View style={styles.wordContainer}>
            <Text style={styles.word}>{item.word}</Text>
            <Text style={styles.definition}>{item.definition}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  wordContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 16,
    color: '#555',
  },
});

export default PracticePage;
