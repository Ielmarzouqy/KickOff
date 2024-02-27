import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlayerComponent = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization:
            'TqtvVNPvolHejTOs5uoG9u0cO32NYwWrCcWVop3IW1WDLkN1hETyVnpjgxZK',
        };
        const url = `https://api.sportmonks.com/v3/football/teams/${'86'}?include=players`;

        const response = await axios.get(url, { headers });
        // const data = await response.json();
        setPlayers(response.data.data.players);
        console.log(response.data.data.players, 'players');
        console.log(response.data.data.players.id, 'id of player ');

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getPlayerName = async (playerId) => {
    const headers = {
      Authorization:
        'TqtvVNPvolHejTOs5uoG9u0cO32NYwWrCcWVop3IW1WDLkN1hETyVnpjgxZK',
    };
    const response = await axios.get(
      `https://api.sportmonks.com/v3/football/players/${playerId}`,
      { headers }
    );
    // const data = await response.json();
    console.log(response.data.data, 'data');
    // return data.data.fullname;
  };

  return (
    <View>
      {players.map((player, index) => (
        <View key={index} style={styles.playerContainer}>
          <Text style={styles.playerName}>Name: {getPlayerName(player.player_id)}</Text>
          <Text style={styles.playerPosition}>Jersey Number: {player.jersey_number}</Text>
          <Text style={styles.playerPosition}>Position: {player.formation_position}</Text>
        </View>
      ))}
    </View>
    // <View style={styles.container}>
    //   {players &&
    //     players.map((player, index) => (
    //       <View key={index} style={styles.playerContainer}>
    //         <Text style={styles.playerName}>name:{player.player_id}</Text>
    //         <Text style={styles.playerPosition}>
    //           Jersey Number: {player.jersey_number}
    //         </Text>
    //         <Text style={styles.playerPosition}>
    //           Position: {player.formation_position}
    //         </Text>
    //       </View>
    //     ))}
    //   <Text>Players</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 14,
    color: '#555',
  },
});

export default PlayerComponent;
