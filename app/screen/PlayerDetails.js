import React from 'react';

import { StyleSheet, View, Text,Image } from 'react-native';

export default function PlayerDetails({ route }) {
  const { player } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: player.image_path }} style={styles.playerAvatar} />
      <Text style={styles.playerName}>
        name
        {player.common_name}
      </Text>
      <Text style={styles.playerInfo}>
        position Position: {player.common_name}
      </Text>
      <Text style={styles.playerInfo}>
        Country:
        {/* {player.country.data.name} */}
      </Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: 'orange',
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     // height: 300,
//     bottom: 0,
//   },
//   button: {
//     padding: 15,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   text: {
//     backgroundColor: 'transparent',
//     fontSize: 15,
//     color: '#fff',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  playerAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});
