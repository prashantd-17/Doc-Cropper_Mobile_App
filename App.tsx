import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DocumentPhotoPicker from './components/DocumentPhotoPicker';
import ImageCropScreen from './components/imageCropScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageCropScreen" component={ImageCropScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}:any) {
  return (
    <View style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My App</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text>Main content goes here...</Text>
        <DocumentPhotoPicker navigation={navigation} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => console.log('Pressed')}>
          <Text style={styles.footerText}>Footer Action</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  footer: {
    height: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
  },
});
