import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";

interface Name {
  title: string;
  first: string;
  last: string;
}

interface User {
  id: {
    name: string;
    value: string;
  };
  name: Name;
}

interface ItemProps {
  item: User;
}

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);

  // example for testing refresh
  const loadUserData = () => {
    setRefreshing(true);
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((json) => {
        setUserData(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    loadUserData(); //can use to refetch data as well
  }, []);

  // remember to create types interface
  const ItemView = ({ item }: ItemProps) => {
    const fullName = `${item.name.first} ${item.name.last}`;

    return (
      <Text
        style={{
          fontSize: 20,
          padding: 10,
        }}
      >
        {item.id.value}: {fullName}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  // can also use activity indicator
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      {/* <ActivityIndicator size="small" color="gray" animating={refreshing} /> */}
      <Text style={styles.title}>Tab Two</Text>
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
        scrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
