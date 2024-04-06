import { User } from "@/api/user/model/user";
import { getUserData } from "@/api/user/userApi";
import React, { useState, useEffect } from "react";
import { View, Button, TextInput } from "react-native";
import { Text } from "@/components/Themed";

export default function ListScreen() {
  const [users, setUsers] = useState<User[] | null>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUserData("users");
      if (result.success) {
        setUsers(result.data.users);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addUsers = async () => {
    try {
      const userData = {
        id,
        email,
        verified_email: true,
        name,
        given_name: name.split(" ")[0],
        family_name: name.split(" ")[1],
        picture: `https://test.com/${name.trim().toLowerCase()}.jpg`,
        locale: "en_US",
      };

      if (users?.some((user) => user.name === userData.name)) {
        console.log("User already exists");
        return;
      }

      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User added successfully");
        fetchUsers();
        setId("");
        setName("");
        setEmail("");
      } else {
        console.error("Error adding user");
      }
    } catch (error) {
      console.error("Error adding users", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        fetchUsers();
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="id"
          value={id}
          onChangeText={setId}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 10 }}
        />
        <Button title="Add User" onPress={addUsers} />
        {users ? (
          users.map((user: any, index: number) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>{user.name}</Text>
              <Text>{user.email}</Text>
              {/* can add other user info */}
              <Button title="Delete User" onPress={() => deleteUser(user.id)} />
            </View>
          ))
        ) : (
          <Text>No users found</Text>
        )}
      </View>
    </View>
  );
}
