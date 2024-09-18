import React, { useState } from 'react';
import { Image, StyleSheet, Button, FlatList, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for practiceWords
interface PracticeWord {
    id: string;
    word: string;
}

// Assume you have a RootStackParamList defined in your app
type RootStackParamList = {
    Home: undefined;
    // Add other screens here
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // State holding an array of practice words
    const [practiceWords, setPracticeWords] = useState<PracticeWord[]>([
        { id: '1', word: 'React' },
        { id: '2', word: 'JavaScript' },
        { id: '3', word: 'Native' },
        { id: '4', word: 'Components' },
        { id: '5', word: 'Props' },
    ]);

    // Function to render each word in the list
    const renderWord = ({ item }: { item: PracticeWord }) => (
        <View style={styles.wordContainer}>
            <Text style={styles.wordText}>{item.word}</Text>
        </View>
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Your Favorite Words</ThemedText>
            </ThemedView>

            {/* FlatList to display the practice words */}
            <FlatList
                data={practiceWords}
                renderItem={renderWord}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />

            {/* Back button */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Back"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    list: {
        padding: 16,
    },
    wordContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    wordText: {
        fontSize: 18,
    },
    buttonContainer: {
        padding: 16,
        alignItems: 'center',
    },
});