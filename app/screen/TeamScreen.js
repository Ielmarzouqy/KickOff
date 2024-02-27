import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

const TeamScreen = ({ route }) => {
  const { matchId } = route.params;
  // Fetch match details using matchId
  const [match, setMatch] = useState({});
  const [team, setTeam] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('effect');
    // if(matchId){
    const detailMatch = async () => {
      try {
        const headers = {
          Authorization:
            'TqtvVNPvolHejTOs5uoG9u0cO32NYwWrCcWVop3IW1WDLkN1hETyVnpjgxZK',
        };
        const url = `https://api.sportmonks.com/v3/football/fixtures/${matchId}?include=participants;season;round`;


        const response = await axios.get(url, { headers });
        setMatch(response.data.data);
        if (response.data.data.participants.length >= 2) {
          const participant1Id = response.data.data.participants[0].id;
          const participant2Id = response.data.data.participants[1].id;


          const [team1Response, team2Response] = await axios.all([
            axios.get(`https://api.sportmonks.com/v3/football/teams/${participant1Id}?include=players`, { headers }),
            axios.get(`https://api.sportmonks.com/v3/football/teams/${participant2Id}?include=players`, { headers })
          ]);

          setTeam([team1Response.data.data, team2Response.data.data]);
        }


        // const response = await axios.get(url, { headers });
        // setMatch(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error(error, 'error fetching match');
      }
    };
    if (matchId) {
      detailMatch();
    }
  }, [matchId]);

  console.log(team,"ressuuuuuuult");
 

  const handleMatchPress = (team) => {
    navigation.navigate('AllPlayers', { team });
    Alert.alert('Match ID', `You pressed the button for match ID: ${team}`);

    console.log('presss', team);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Details for ID: {matchId}</Text>
      {match && (
        <>
          <ImageBackground
            source={require('../assets/vs1.jpg')}
            style={styles.backgroundImage}
          >
            {/* <View style={styles.card}>
              {match.participants &&
                match.participants.map((team, index) => (
                  <React.Fragment key={team.id}>
                    {index !== 0 && <Text style={styles.vs}>vs</Text>}

                    <View key={team.id} style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: team.image_path }}
                        style={{ width: 50, height: 50 }}
                      />
                      <Text style={styles.team}>{team.name}</Text>
                      <TouchableOpacity
                        onPress={() => handleMatchPress(team)}
                      >
                        <Text style={styles.team}>{team.id}</Text>
                      </TouchableOpacity>
                    </View>
                  </React.Fragment>
                ))}
            </View> */}

            <View style={styles.card}>
              {team &&
                team.map((team, index) => (
                  <React.Fragment key={team.id}>
                    {index !== 0 && <Text style={styles.vs}>vs</Text>}

                    <View key={team.id} style={{ alignItems: 'center' }}>
                      <Image
                        source={{ uri: team.image_path }}
                        style={{ width: 50, height: 50 }}
                      />
                      <Text style={styles.team}>{team.name}</Text>
                      <TouchableOpacity onPress={() => handleMatchPress(team)}>
                        <Text style={styles.team}>{team.id}</Text>
                      </TouchableOpacity>
                    </View>
                  </React.Fragment>
                ))}
            </View>
          </ImageBackground>

          <View style={styles.cardInfo}>
            <Text style={styles.text}>Match result: {match.result_info}</Text>

            <Text style={styles.text}>Date and Time: {match.starting_at}</Text>
            <Text style={styles.text}>League: {match.league_id}</Text>
            {match.season && (
              <Text style={styles.text}>Season: {match.season.name}</Text>
            )}
            {match.round && (
              <Text style={styles.text}>Stage: {match.round.name}</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => handleMatchPress(match.id)}
            style={{ alignItems: 'center', marginTop: 10 }}
          >
            <Text>See Players</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  team: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vs: {
    color: 'white',
    borderBlockColor: 'pink',
    fontSize: 50,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
  },
  card: {
    backgroundColor: 'black',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    // flex: 1,
    gap: 28,
    flexDirection: 'row',

    alignSelf: 'center',
    // opacity: 0.5,
  },
  cardInfo: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    flex: 1,
    // flexDirection:'row',

    alignSelf: 'center',
    opacity: 0.5,
  },
});

export default TeamScreen;
