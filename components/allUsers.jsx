import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function AllUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        data.map((user) => {
          return (
            <View key={user.id}>
              <Text style={styles.username}>{user.username}</Text>
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
