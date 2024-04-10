import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SwipeListView } from "react-native-swipe-list-view";
import { SwipeRow } from "react-native-swipe-list-view";
import { useRef, useState } from "react";
import { getAbnormalData } from "@/api/abnormalData/abnormalDataApi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useQuery } from "react-query";
import { Dropdown } from 'react-native-element-dropdown';


// const queryClient = new QueryClient();
type RowMap = { [key: string]: SwipeRow<any> };

// 0이 제일 좋은거 1이 두번째로 좋은거 2가 제일 나쁜거

const getPriorityColor = (priority: Number) => {
  if (priority === 0) {
    return "#228B22";
  } else if (priority === 1) {
    return "#E3B23C";
  } else {
    return "#D22B2B";
  };
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

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [abnormalData, setAbnormalData] = useState([]);
  const { data: data, isLoading: isAbnormalDataLoading } = useQuery('abnormalData', getAbnormalData, {
    onSuccess: (data) => {
      if (data.abnormalData.data.length > 0) {
        setIsLoading(true);
        const abnormalDataList = data?.abnormalData.data || [];
        setDataList(abnormalDataList.filter((item: { solved: any; }) => !item.solved));
        setAbnormalData(abnormalDataList.filter((item: { solved: any; }) => !item.solved));
        setIsLoading(false);
      }
    }
  });

  const onSortOptionSelect = (index: string) => {
    console.log(index)
    if (index === "0") {
      setDataList([...dataList].sort((a: any, b: any) => b.priority - a.priority));
    } else if (index === "1") {
      setDataList([...dataList].sort((a: any, b: any) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }));
    }
  };


  const onFilterOptionSelect = (index: string) => {
    if (index === "0") {
      setDataList(abnormalData.filter((item: any) => !item.solved));
      return;
    } else {
      setDataList(abnormalData.filter((item: any) => item.priority === (parseInt(index) - 1) && !item.solved))
    }
    console.log("onFilterOptionSelect selected");
  }

  const deleteSpecificItem = (rowMap: RowMap, itemToDelete: any) => {
    console.log(itemToDelete);

  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const [filter, setFilter] = useState("0");
  const [isFilterFocus, setIsFilterFocus] = useState(false);

  const [sort, setSort] = useState("");
  const [isSortFocus, setIsSortFocus] = useState(false);

  const listViewRef = useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Heat/Insulation</Text>
        <Text style={styles.title}>Management Platform</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.dropdownBox}>
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
            data={dataList}
            renderItem={({ item }: any) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemContainerLeft}>
                  <Text style={styles.item}>{item.area_id}</Text>
                  <Text style={styles.item}>{item.timestamp}</Text>
                  <FontAwesome name="circle" size={25} color={getPriorityColor(item.priority)} />
                </View>
                <View style={styles.itemContainerRight}>
                  <Text style={styles.item}>Temperature: {item.temperature}</Text>
                  <Text style={styles.item}>Air Flow: {item.air_flow}</Text>
                  <Text style={styles.item}>CO2: {item.co2}</Text>
                </View>
              </View>
            )}
            renderHiddenItem={({ item, index }: any, rowMap: RowMap) => (
              <View style={styles.hiddenItemContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    deleteSpecificItem(rowMap, item.id)
                  }
                  }
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
    </View >
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
