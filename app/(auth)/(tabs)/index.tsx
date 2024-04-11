import { ActivityIndicator, Button, Modal, ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SwipeListView } from "react-native-swipe-list-view";
import { SwipeRow } from "react-native-swipe-list-view";
import { useRef, useState } from "react";
import { getAbnormalData, updateAbnormalData } from "@/api/abnormalData/abnormalDataApi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { useQuery } from "react-query";
import { Dropdown } from 'react-native-element-dropdown';

type RowMap = { [key: string]: SwipeRow<any> };

const formatTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// priority level: 0 -> 1 -> 2 (2가 제일 안좋음)

export default function Landing() {

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
    { label: "Datetime (Old)", value: "1" },
    { label: "Datetime (New)", value: "2" }
  ]

  const filterOptions = [
    { label: "All", value: "0" },
    { label: "Caution", value: "1" },
    { label: "Bad", value: "2" },
    { label: "Very bad", value: "3" }
  ]
  const [isLoading, setIsLoading] = useState(false);
  const [unsolvedIssuedataList, setunsolvedIssueDataList] = useState([]);
  const [entireabnormalData, setEntireAbnormalData] = useState([]);

  const { data: data, isLoading: isAbnormalDataLoading } = useQuery('abnormalData', getAbnormalData, {
    onSuccess: (data) => {
      if (data.abnormalData.data.length > 0) {
        setIsLoading(true);
        const abnormalDataList = data?.abnormalData.data || [];

        const formattedAbnormalDataList = abnormalDataList.map((item: any) => ({
          ...item,
          timestamp: formatTimestamp(item.timestamp)
        }));

        setunsolvedIssueDataList(formattedAbnormalDataList.filter((item: { solved: any; }) => !item.solved));
        setEntireAbnormalData(formattedAbnormalDataList);
        setIsLoading(false);
      }
    }
  });

  const onSortOptionSelect = (index: string) => {
    if (index === "0") {
      setunsolvedIssueDataList([...unsolvedIssuedataList].sort((a: any, b: any) => b.priority - a.priority));
    } else if (index === "1") {
      setunsolvedIssueDataList([...unsolvedIssuedataList].sort((a: any, b: any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }));
    } else {
      setunsolvedIssueDataList([...unsolvedIssuedataList].sort((a: any, b: any) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }));
    }
  };


  const onFilterOptionSelect = (index: string) => {
    if (index === "0") {
      setunsolvedIssueDataList(entireabnormalData.filter((item: any) => !item.solved));
      return;
    } else {
      setunsolvedIssueDataList(entireabnormalData.filter((item: any) => item.priority === (parseInt(index) - 1) && !item.solved))
    }
  }

  const deleteSpecificItem = (rowMap: RowMap, itemToDelete: any) => {
    const updatedDataList = unsolvedIssuedataList.filter((item: any) => item.id !== itemToDelete);
    setunsolvedIssueDataList(updatedDataList);
    updateAbnormalData(itemToDelete);
  };

  const handleViewSolved = () => {
    const solvedIssueDataList = entireabnormalData.filter((item: any) => item.solved);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const modalContent = (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: "white" }]}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, paddingTop: 20 }}>Solved Abnormal Data</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.itemStyle, { backgroundColor: "white", marginTop: 20 }]}>
            {entireabnormalData.filter((item: any) => item.solved).map((item: any) => (
              <View key={item.id} style={[styles.itemContainer, { backgroundColor: "#b6d6e8" }, styles.shadow]}>
                <View style={[styles.itemContainerLeft, { backgroundColor: "#b6d6e8" }]}>
                  <Text style={styles.item}>{item.area_id}</Text>
                  <Text style={styles.item}>{item.timestamp}</Text>
                  <FontAwesome name="circle" size={25} color={getPriorityColor(item.priority)} />
                </View>
                <View style={[styles.itemContainerRight, { backgroundColor: "#b6d6e8" }]}>
                  <Text style={styles.item}>Temperature: {item.temperature}</Text>
                  <Text style={styles.item}>Air Flow: {item.air_flow}</Text>
                  <Text style={styles.item}>CO2: {item.co2}</Text>
                </View>
              </View>
            ))
            }
          </View>
        </View>
      </View>
    </ScrollView >
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const [filter, setFilter] = useState("0");
  const [isFilterFocus, setIsFilterFocus] = useState(false);

  const [sort, setSort] = useState("");
  const [isSortFocus, setIsSortFocus] = useState(false);

  const [showModal, setShowModal] = useState(false);

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
          <Button title="View Solved" onPress={handleViewSolved} />
          <Dropdown
            style={[styles.dropdown, isFilterFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
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
          <Modal visible={showModal} onRequestClose={handleCloseModal}>
            {modalContent}
            <Button title="Close" onPress={handleCloseModal} />
          </Modal>
          <SwipeListView
            ref={listViewRef}
            data={unsolvedIssuedataList}
            renderItem={({ item }: any) => (
              <View style={[styles.itemContainer, styles.shadow]}>
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
  modalContainer: {
    backgroundColor: "green",
    flex: 1,
    marginTop: 50,
    width: "90%",
    alignItems: "center",
  },
  modalOuterContainer: {
    flex: 1,
    backgroundColor: "#8cb0ce",
    width: "100%",
    justifyContent: "center",
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
    height: "100%",
    paddingLeft: 5,
    flex: 1,
    alignItems: "flex-start"
  },
  itemContainerRight: {
    backgroundColor: "white",
    height: "100%",
    width: "40%",
    alignItems: "flex-end",
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
    height: 40,
    width: 100,
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  modalitem: {
    fontSize: 16,
    marginBottom: 5,
  },
  shadow: {
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});