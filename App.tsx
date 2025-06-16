import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import DocumentPhotoPicker from './components/DocumentPhotoPicker';
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My App</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text>Main content goes here...</Text>
        <DocumentPhotoPicker></DocumentPhotoPicker>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable onPress={() => console.log('Pressed')}>
          <Text style={styles.footerText}>Footer Action</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
