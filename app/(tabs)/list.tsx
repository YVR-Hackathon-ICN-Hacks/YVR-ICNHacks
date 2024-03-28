import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

export default function ListScreen() {
  const navigation = useNavigation();
  const [list, setList] = useState<string[]>([]);

  // Define the background color
  const backgroundColor = "white";

  // Set the text and icon color based on the background color
  const textColor = backgroundColor === "white" ? "black" : "white";
  const iconColor = textColor;

  const addItem = () => {
    const newItem = `Item ${list.length + 1}`;
    setList((currentList) => [...currentList, newItem]);
  };

  const deleteItem = () => {
    setList((currentList) => currentList.slice(0, -1));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addItem}>
          <FontAwesome
            name="plus"
            size={25}
            color={iconColor}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={deleteItem}>
          <FontAwesome
            name="trash"
            size={25}
            color={iconColor}
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addItem, deleteItem, iconColor]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Text style={[styles.item, { color: textColor }]}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  const renderItem = ({ item }: { item: string }) => {
    const handleDelete = () => {
      setList((currentList) => currentList.filter((i) => i !== item));
    };
  
    const handlePin = () => {
      // Implement your pin logic here (e.g., update item status)
      console.log('Pinned item:', item);
    };

    return (
        <Swipeable renderRightActions={(_, dragX) => (
            <View style={{ flexDirection: 'row' }}> 
              <TouchableOpacity 
                style={[styles.rightAction, styles.pinButton]}
                onPress={handlePin} 
              >
                <FontAwesome name="thumb-tack" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.rightAction, styles.deleteButton]} 
                onPress={handleDelete}
              >
                <FontAwesome name="trash" size={24} color="white"/>
              </TouchableOpacity>
            </View>
          )}>
          <Text style={[styles.item, { color: textColor }]}>{item}</Text>
        </Swipeable>
      );
    };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <FlatList
        data={list}
        renderItem={renderItem} // Use the updated renderItem
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 88,
      justifyContent: "center", 
      alignItems: "center", 
      width: "100%", 
      textAlign: "center", 
      flexDirection: "row", 
    },
    rightAction: { // Add this block
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1, 
      width: 80, 
    }, 
    pinButton: {
      backgroundColor: 'orange', 
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
    },
    deleteText: {
      color: 'white',
      fontWeight: 'bold'
    }
  });
