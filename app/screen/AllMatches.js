import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-GB', options);
};

const DateDisplay = ({ dateString }) => {
  const formattedDate = formatDate(dateString);
  return <Text>{formattedDate}</Text>;
};

const AllMatches = ({ navigation }) => {
  console.log('test clg');

  const [data, setData] = useState(null);

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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text >
        <DateDisplay style={{flex: 14, justifyContent: 'center' , alignItems: 'center' }} dateString={item.starting_at} />
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
      {/* <Text style={{flex: 1, justifyContent: 'center' , alignItems: 'center' }}>{item.result_info}</Text> */}

    </View>
  );

  return (

    <LinearGradient
        colors={['#B9A4B9', '#4B1369', '#260E3A']}
        style={{ flex: 1 }}
      >
    <View style={{ flex: 1, justifyContent: 'center' }}>
    
      <Text>this all match </Text>
    
      {data && (
        <FlatList
          data={data.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
     
    </View>
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
  teamImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  vs:{
    borderColor: '#ddd',
    fontSize: 20 

  }
});

export default AllMatches;
