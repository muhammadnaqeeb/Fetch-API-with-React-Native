







To fetch data from the internet in React Native, you can use the built-in fetch API or a third-party library like axios.

**Fetch Example**
```
fetch('https://jsonplaceholder.typicode.com/posts')

.then(response => response.json())

.then(data => console.log(data))

.catch(error => console.error(error));
```

# Fetch
The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) provides a JavaScript interface that can fetch resources asynchronously over the network. It is very similar to the [**XMLHttpRequest**](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), that is used for the same purpose. But the fetch API is powerful and flexible.

**Import**
```

import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';

import { useState, useEffect } from 'react';
```
**Make loading state**
```
const [isLoading, setLoading] = useState(true);
```

**Terninory operator where you have to display data**

```const [isLoading, setLoading] = useState(true);

return (

<SafeAreaView style={styles.container}>

{isLoading?<ActivityIndicator /> : <FlatList />}

</SafeAreaView>

);
```

This will create loading indicator on screen.

**Create State for data(for data to be fetched)**

```
const [data, setData] = useState([])
```

**Use useEffect hook and fetch data**

```
// fetching data

useEffect(()=>{

fetch(movieURL)

.then((response) => response.json())

.then((json) => setData(json.movies))

.catch((error) => alert(error))

.finally(() => setLoading(false));

});
```

**Display data into flatlist**

```
return (

   <SafeAreaView style={styles.container}>

   {isLoading ? <ActivityIndicator /> : <FlatList

        data={data}

        keyExtractor={({id}, index)=> id}

        renderItem={(itemData)=>{

          return(

             <Text>{itemData.item.title}{itemData.item.releaseYear}</Text>**

          );

       }}

       />}

    </SafeAreaView>

);
```


**Fetching multiple things**
```

const [title, setTitle] = useState([])

const [description, setDescription] = useState([])
```

```

// fetching data

useEffect(()=>{

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
```

```
<View>

   <Text>{title}</Text>

   <Text>{description}</Text>

   <FlatList ...
   ```


# Complete Code

```
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

```

