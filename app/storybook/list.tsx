import { useState, useRef, useLayoutEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { SwipeRow } from "react-native-swipe-list-view";
type RowMap = { [key: string]: SwipeRow<any> };

export default function ListScreen() {
  const navigation = useNavigation();
  const [list, setList] = useState<{ name: string; isPinned: boolean }[]>([]);

  const addItem = () => {
    const newItem = { name: `Item ${list.length + 1}`, isPinned: false };
    setList((currentList) => [...currentList, newItem]);
  };

  const deleteItem = () => {
    setList([]); // Clear the entire list
  };

  const deleteSpecificItem = (rowMap: RowMap, itemToDelete: string) => {
    if (rowMap[itemToDelete]) {
      rowMap[itemToDelete].closeRow();
    }
    setList((currentList) =>
      currentList.filter((item) => item.name !== itemToDelete)
    );
  };

  const pinItem = (itemToPin: string) => {
    setList((currentList) => {
      const newList = currentList.map((item) =>
        item.name === itemToPin ? { ...item, pinned: !item.isPinned } : item
      );
      return newList.sort(
        (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
      );
    });
  };

  const togglePin = (rowMap: RowMap, index: number) => {
    const item = list[index];
    if (rowMap[item.name]) {
      rowMap[item.name].closeRow();
    }
    setList((currentList) => {
      const newList = [...currentList];
      newList[index].isPinned = !newList[index].isPinned;
      return newList.sort(
        (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
      );
    });
  };

  const listViewRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addItem}>
          <FontAwesome
            name="plus"
            size={25}
            color="black"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={deleteItem}>
          <FontAwesome
            name="trash"
            size={25}
            color="black"
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, addItem, deleteItem]);

  return (
    <View style={styles.container}>
      <SwipeListView
        ref={listViewRef}
        data={list}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.isPinned && (
              <FontAwesome
                name="thumb-tack"
                size={12}
                color="black"
                style={styles.pinIcon}
              />
            )}
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )}
        renderHiddenItem={({ item, index }, rowMap) => (
          <View style={styles.hiddenItemContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteSpecificItem(rowMap, item.name)}
            >
              <FontAwesome name="trash" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pinButton}
              onPress={() => togglePin(rowMap, index)}
            >
              <FontAwesome name="thumb-tack" size={25} color="white" />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={160}
        rightOpenValue={0} // Add this line to disable swipe from right to left
        keyExtractor={(item, index) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    flexDirection: "row",
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 80,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    padding: 10,
    width: "100%",
    alignItems: "center", // Ensure the items within this container are vertically centered
  },
  hiddenItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", 
    padding: 10,
    height: 58,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 55,
    borderRadius: 10,
    marginRight: 5,
  },
  pinButton: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 55,
    borderRadius: 10,
    marginRight: 5,
  },
  pinIcon: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  copyButton: {
    backgroundColor: "blue", // Choose an appropriate color
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 55,
    borderRadius: 10,
  },
});