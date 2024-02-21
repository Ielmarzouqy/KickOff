// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
// import axios from 'axios';

// const HomeScreen = ({ navigation }) => {
//   console.log('test clg');

//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       // console.log('data', response.data);
//       try {
//         const headers = {
//           Authorization:
//             'TqtvVNPvolHejTOs5uoG9u0cO32NYwWrCcWVop3IW1WDLkN1hETyVnpjgxZK',
//         };
//         const url = 'https://api.sportmonks.com/v3/football/fixtures?include=participants';

//         const response = await axios.get(url, { headers });
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     getData();
//   }, []);

//   const renderItem = ({ item }) => (


//     <View style={styles.card}>
//     <Text>{item.name}</Text>
//     <Text>{item.starting_at}</Text>
//     <Text>{item.result_info}</Text>
//     <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
//       {item.participants.map(team => (
//         <View key={team.id} style={{ alignItems: 'center' }}>
//           <Text>{team.name}</Text>
//           <Image source={{ uri: team.image_path }} style={{ width: 50, height: 50 }} />
//         </View>
//       ))}
//     </View>
//   </View>
//   );

//   return (
 

//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//   <Text>Welcome to Home Screen</Text>
//   <Button
//     title="Go to Profile"
//     onPress={() => navigation.navigate('Profile')}
//   />
//   {data && (
//     <FlatList
//       data={data.data}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem}
//     />
//   )}
// </View>

//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'white',
//     padding: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     width: '90%',
//     alignSelf: 'center',
//   },
//   teamImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 10,
//   },
// });

// export default HomeScreen;
