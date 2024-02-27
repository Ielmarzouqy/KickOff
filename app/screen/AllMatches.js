import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-GB', options);
};

const DateDisplay = ({ dateString }) => {
  const formattedDate = formatDate(dateString);
  return <Text>{formattedDate}</Text>;
};

const AllMatches = () => {
  console.log('test clg');

  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const headers = {
          Authorization:
            'TqtvVNPvolHejTOs5uoG9u0cO32NYwWrCcWVop3IW1WDLkN1hETyVnpjgxZK',
        };
        const url =
          'https://api.sportmonks.com/v3/football/fixtures?include=participants';

        const response = await axios.get(url, { headers });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const handleMatchPress = (matchId) => {
    navigation.navigate('TeamScreen', { matchId });
    Alert.alert('Match ID', `You pressed the button for match ID: ${matchId}`);

    console.log('presss', matchId);
  };
  return (
    <LinearGradient
      colors={['#B9A4B9', '#4B1369', '#260E3A']}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>this all match </Text>

          {data &&
            data.data.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text>
                  <DateDisplay dateString={item.starting_at} />
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}
                >
                  {item.participants.map((team, index) => (
                    <React.Fragment key={team.id}>
                      {index !== 0 && <Text style={styles.vs}>vs</Text>}

                      <View key={team.id} style={{ alignItems: 'center' }}>
                        <Image
                          source={{ uri: team.image_path }}
                          style={{ width: 50, height: 50 }}
                        />
                        <Text>{team.name}</Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
                {/* <TouchableOpacity
                  title="TeamScreen"
                  onPress={handleMatchPress(item.id)}
                >
                  <Text>see details</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => handleMatchPress(item.id)}
                  style={{ alignItems: 'center', marginTop: 10 }}
                >
                  <Text>See Details</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B9A4B9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    alignSelf: 'center',
  },
  vs: {
    borderColor: '#ddd',
    fontSize: 20,
  },
});

export default AllMatches;
