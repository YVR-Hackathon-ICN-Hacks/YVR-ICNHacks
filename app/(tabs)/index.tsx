import { Pressable, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";

export default function LandingOne() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={
          (styles.container,
          { backgroundColor: colorScheme === "dark" ? "#101010" : "#ffffff" })
        }
      >
        <View style={styles.lineBlock}></View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome! (name)</Text>
          <Text style={styles.description}>Explore features</Text>
        </View>
        <View style={styles.lineBlock}></View>
        <View style={styles.itemBlock}>
          <Text style={styles.textStyle}>Main</Text>
        </View>
        <View style={styles.itemContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => {
                navigation.navigate("details", { id: 1 }); //maybe assign types later
              }}
              style={styles.viewStyle}
            >
              <View>
                <Text style={styles.textStyle}>Item 1</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("details", { id: 2 });
              }}
              style={styles.viewStyle}
            >
              <View>
                <Text style={styles.textStyle}>Item 2</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("details", { id: 3 });
              }}
              style={styles.viewStyle}
            >
              <View>
                <Text style={styles.textStyle}>Item 3</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("details", { id: 4 });
              }}
              style={styles.viewStyle}
            >
              <View>
                <Text style={styles.textStyle}>Item 4</Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lineBlock: {
    height: 10,
  },
  itemBlock: {
    width: 330,
    height: 330,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Adjust the value as needed for rounded border
    elevation: 5, // Shadow elevation (Android specific)
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    margin: 10,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textContainer: {
    alignItems: "flex-start",
    // borderWidth: 1, // Border width
    // borderColor: '#ccc',
    paddingLeft: 30,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Adjust as needed for horizontal padding
    marginTop: 20, // Adjust as needed for top margin
  },
  viewStyle: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Adjust the value as needed for rounded border
    elevation: 5, // Shadow elevation (Android specific)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    margin: 10,
  },
  textStyle: {
    fontSize: 20,
    padding: 15,
    color: "black",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
});
