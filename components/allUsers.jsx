import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const addUser = () => {
    const name = newName;
    const email = newEmail;
    const website = newWebsite;

    if (name && email && website) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers([...users, data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          users.map((user) => {
            return (
              <View key={user.id}>
                <Text style={styles.username}>{user.username}</Text>
                <Text>Navn: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Virksomhed: {user.company.name}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
      <View>
        <TextInput
          placeholder='Navn'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}></TextInput>
        <TextInput
          placeholder='Email'
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}></TextInput>
        <TextInput
          placeholder='Hjemmeside'
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}></TextInput>
        <Button
          onPress={addUser}
          title='Opret'></Button>
      </View>
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
