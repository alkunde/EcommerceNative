import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 18
  }
})
