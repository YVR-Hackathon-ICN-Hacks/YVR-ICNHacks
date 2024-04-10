import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SwipeListView } from "react-native-swipe-list-view";
import { SwipeRow } from "react-native-swipe-list-view";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { getAbnormalData } from "@/api/abnormalData/abnormalDataApi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dropdown } from 'react-native-element-dropdown';


type RowMap = { [key: string]: SwipeRow<any> };

// 0이 제일 좋은거 1이 두번째로 좋은거 2가 제일 나쁜거
const mockData = [
  {
    id: 1,
    areaCode: "A1",
    priority: 2,
    timestamp: "2021-09-01 12:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 2,
    areaCode: "A1",
    priority: 1,
    timestamp: "2021-09-01 16:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 3,
    areaCode: "A2",
    priority: 0,
    timestamp: "2021-09-01 12:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: true,
  },
  {
    id: 4,
    areaCode: "A5",
    priority: 0,
    timestamp: "2021-08-24 06:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 5,
    areaCode: "A5",
    priority: 0,
    timestamp: "2021-09-01 20:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 6,
    areaCode: "A5",
    priority: 0,
    timestamp: "2021-09-01 14:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 7,
    areaCode: "A5",
    priority: 2,
    timestamp: "2021-09-03 12:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  },
  {
    id: 8,
    areaCode: "A5",
    priority: 0,
    timestamp: "2021-09-01 12:00:00",
    temperature: 0,
    airflow: 2,
    co2: 1,
    solved: false,
  }
]

// async function getData() {
//   let data = await getAbnormalData();
//   data = data.abnormalData;
// }


export default function Landing() {
  let data = [];

  async function getData() {
    data = await getAbnormalData();
    data = data.abnormalData;
  }

  useEffect(() => {
    getData();
  }, []);

  const [list, setList] = useState(mockData.filter(item => !item.solved));

  const deleteSpecificItem = (rowMap: RowMap, itemToDelete: number) => {

    if (rowMap[itemToDelete]) {
      rowMap[itemToDelete].closeRow();
    }

    setList((currentList) => {
      const newList = [];
      for (let item of currentList) {
        if (item.id === itemToDelete) {

          const updatedItem = { ...item, solved: true }; // 현재 list에 있는 item을 수정
          mockData[item.id - 1] = updatedItem; // mockdata 수정

          if (!updatedItem.solved) {
            newList.push(updatedItem);
          }
        } else {
          newList.push(item);
        }
      }
      return newList;
    });
  };

  const listViewRef = useRef(null);

  const getPriorityColor = (priority: Number) => {
    if (priority === 0) {
      return "#228B22";
    } else if (priority === 1) {
      return "#E3B23C";
    } else {
      return "#D22B2B";
    };
  }

  const sortByPriority = () => {
    const sortedList = [...list].sort((a, b) => b.priority - a.priority);
    setList(sortedList);
  };

  const sortByTimestamp = () => {
    const sortedList = [...list].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    setList(sortedList);
  };

  const onSortOptionSelect = (index: string) => {
    if (index === "0") {
      sortByPriority();
    } else if (index === "1") {
      sortByTimestamp();
    }
  };

  const onFilterOptionSelect = (index: string) => {
    // const filteredList = []
    if (index === "0") {
      setList(mockData.filter(item => !item.solved));
      return;
    } else {
      setList(mockData.filter(item => item.priority === (parseInt(index) - 1) && !item.solved))
    }
    // const filteredList = mockData.filter(item => item.priority === parseInt(index) && !item.solved);
    // setList(filteredList);
  }

  const sortOptions = [
    { label: "Priority", value: "0" },
    { label: "Datetime (New)", value: "1" },
  ]

  const filterOptions = [
    { label: "All", value: "0" },
    { label: "Caution", value: "1" },
    { label: "Bad", value: "2" },
    { label: "Very bad", value: "3" },
  ]

  const [filter, setFilter] = useState("0");
  const [isFilterFocus, setIsFilterFocus] = useState(false);

  const [sort, setSort] = useState("");
  const [isSortFocus, setIsSortFocus] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Heat/Insulation</Text>
        <Text style={styles.title}>Management Platform</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.dropdownBox}>
          {/* <Text style={{ fontSize: 25, color: "white", marginStart: 10 }}>Notifications</Text> */}
          <Dropdown
            style={[styles.dropdown, isSortFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sortOptions}
            maxHeight={300}
            labelField={"label"}
            valueField={"value"}
            placeholder={!isSortFocus ? '  Sort By' : '...'}
            value={sort}
            onFocus={() => setIsSortFocus(true)}
            onBlur={() => setIsSortFocus(false)}
            onChange={(item) => {
              setSort(item.value);
              setIsSortFocus(false);
              onSortOptionSelect(item.value);
            }}
          />
          <Dropdown
            style={[styles.dropdown, isFilterFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={filterOptions}
            maxHeight={300}
            labelField={"label"}
            valueField={"value"}
            placeholder={!isFilterFocus ? '  Filter By' : '...'}
            value={filter}
            onFocus={() => setIsFilterFocus(true)}
            onBlur={() => setIsFilterFocus(false)}
            onChange={(item) => {
              setFilter(item.value);
              setIsFilterFocus(false);
              onFilterOptionSelect(item.value);
            }}
          />
        </View>
        <View style={styles.itemStyle}>
          <SwipeListView
            ref={listViewRef}
            data={list}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemContainerLeft}>
                  <Text style={styles.item}>{item.areaCode}</Text>
                  <Text style={styles.item}>{item.timestamp}</Text>
                  <FontAwesome name="circle" size={25} color={getPriorityColor(item.priority)} />
                </View>
                <View style={styles.itemContainerRight}>
                  <Text style={styles.item}>Temperature: {item.temperature}</Text>
                  <Text style={styles.item}>Air Flow: {item.airflow}</Text>
                  <Text style={styles.item}>CO2: {item.co2}</Text>
                </View>
              </View>
            )}
            renderHiddenItem={({ item, index }, rowMap) => (
              <View style={styles.hiddenItemContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteSpecificItem(rowMap, item.id)}
                >
                  <FontAwesome name="trash" size={25} color="white" />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-100}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8cb0ce",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginTop: 20,
    marginBottom: 20,
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginBottom: 20
  },
  itemStyle: {
    flex: 1,
    width: "90%",
    height: "50%",
    borderRadius: 10,
    backgroundColor: "#8cb0ce",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hiddenItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    height: 58,
    backgroundColor: "#8cb0ce",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 75,
    borderRadius: 10,
    marginRight: 5,
  },
  itemContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 15,
    padding: 10,
    width: "100%",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  itemContainerLeft: {
    backgroundColor: "white",
    width: "60%",
    paddingLeft: 5,
    flex: 1,
    alignItems: "flex-start"
  },
  itemContainerRight: {
    backgroundColor: "white",
    width: "40%",
    alignItems: "flex-end"
  },
  item: {
    fontSize: 15,
    height: 20,
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
    backgroundColor: '#8cb0ce',
    height: 50,
  },
  dropdown: {
    height: 50,
    width: 150,
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
