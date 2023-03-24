import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

const movieURL = "https://reactnative.dev/movies.json";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [title, setTitle] = useState([])
  const [description, setDescription] = useState([])

  // fetching data
  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies)
        setTitle(json.title)
        setDescription(json.description)
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  });
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> :
        <View>
          <Text style={styles.mainHeaing}>{title}</Text>
          <Text>{description}</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={(itemData) => {
              return (
                <Text style={styles.movieText}>
                  {itemData.item.title}
                  <Text> : </Text>
                  {itemData.item.releaseYear}
                </Text>
              );
            }}
          />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48
  },
  mainHeaing: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  movieText: {
    fontSize: 26,
    fontWeight: 200
  },
  description: {
    color: "gray"
  }

});
