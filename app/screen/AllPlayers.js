import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AllPlayers = ({ route }) => {
  const { team } = route.params;

  console.log(JSON.stringify(route.params.matchId, null, 2));
  console.log(team, 'pppppppppppppppppp');
  const [playersData, setPlayersData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [text, setText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlayersData = async () => {
      const promises = team.players.map(async (player) => {
        try {
          const response = await axios.get(
            `https://api.sportmonks.com/v3/football/players/${player.player_id}?include=country;position`,
            {
              headers: {
                Authorization:
                  'TL6Gh8pelPNE0dfFrjTAEc6UD3eAdgnq1PuqigxjirGAk7XCyEJkvszFiMPx',
              },
            }
          );
          return response.data.data;
        } catch (error) {
          console.error('Error fetching player data:', error);
          return null;
        }
      });

      const playersData = await Promise.all(promises);
      setPlayersData(playersData.filter((player) => player !== null));
    };

    if (team) {
      fetchPlayersData();
    }
  }, [team]);

  const handleSearch = (text) => {
    setText(text);
    setSearchQuery(text);
    const filteredPlayers = playersData.filter((player) =>
      player.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredPlayers);
  };

  const handlePlayerPress = (player) => {
    navigation.navigate('PlayerDetails', { player });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePlayerPress(item)}
      style={{ width: 160, height: 75 }}
    >
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 4,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          borderRadius: 12,
        }}
      >
        <Image source={{ uri: item.image_path }} style={styles.playerAvatar} />
        {item.name && (
          <Text numberOfLines={1} style={[styles.playerName, { width: 80 }]}>
            {item.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Players</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search player by name"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {text != '' ? (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={playersData}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContent: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 14,
    color: '#666',
  },
  playerNumber: {
    fontSize: 14,
    color: '#666',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AllPlayers;
