import * as React from 'react';
import { StyleSheet, Button, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({ navigation }) {
  const showAllMatches = () => {
    navigation.navigate('AllMatches');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#B9A4B9', '#4B1369', '#260E3A']}
        style={styles.background}
      />

      <LinearGradient
        colors={['#B9A4B9', '#4B1369', '#260E3A']}
        style={{ flex: 1 }}
      >
        <Button title="Press me" onPress={showAllMatches} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // height: 300,
    bottom: 0,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
