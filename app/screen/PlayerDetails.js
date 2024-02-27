import React from 'react';

import { StyleSheet, View, Text,Image } from 'react-native';

export default function PlayerDetails({ route }) {
  const { player } = route.params;

  return (
    <View style={styles.container}>
      <Image testID='player-avatar' source={{ uri: player.image_path }} style={styles.playerAvatar} />
      <View>
        <Text style={styles.playerName}>{player.common_name}</Text>
      {/* {player.position && <Text style={styles.playerInfo}>{player.position.name}</Text>} */}
      {/* <Text style={styles.playerInfo}>{player.country.data.name}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4, 
      width: '40%',
      borderRadius: 5,
      backgroundColor: '#fff', 
    },
    playerAvatar: {
      width: '100%',
      height: 400, 
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    container: {
      padding: 16,
    },
    playerName: {
      fontWeight: 'bold',
    },
    playerInfo: {
      paddingTop: 5,
    },
  });