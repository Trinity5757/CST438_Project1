import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
        {/* Change button text based on signed-in state */}
        <Button title={signedIn ? "Sign Out" : "Sign In"} onPress={toggleSignIn} />
      </View>
      
      {/* Conditionally render the sign-in form */}
      {showSignIn && !signedIn && (
        <View style={styles.signInContainer}>
          <ThemedText type="subtitle">Sign In</ThemedText>
          
          {/* Username input */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername} // Store the input username
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#888"
          />
          {/* Submit button */}
          <Button title="Submit" onPress={handleSignIn} />
        </View>
      )}

      <ThemedView style={styles.titleContainer}>
        {/* Wrap randomNumber inside a <Text> component */}
        <ThemedText type="title">
          Word of the Day! {"\n"} <Text>{randomNumber}</Text>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        {/* Use Button title properly */}
        <Button title="Add to Practice" onPress={AddToPractice} />
        <Button title="Add to Favorite" onPress={AddToFavorite} />
      </ThemedView>

      <View style={styles.randomizeButton}>
        {/* Use Button title properly */}
        <Button title="Randomize" onPress={handleRandomize} />
      </View>
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
  randomizeButton: {
    marginTop: 16,
    alignItems: 'center',
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

