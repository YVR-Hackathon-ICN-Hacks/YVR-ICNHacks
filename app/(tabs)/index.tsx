import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonComponent from "@/components/landingButton";

const data = [
  { id: 1, name: "John Doe", age: 30, job: "Engineer" },
  { id: 2, name: "Jane Smith", age: 25, job: "Designer" },
  { id: 3, name: "Michael Brown", age: 35, job: "Manager" },
];

type ItemType = {
  id: number;
  name: string;
  age: number;
  job: string;
};

export default function Landing() {
  const navigation = useNavigation();
  const renderItem: ({ item }: { item: ItemType }) => JSX.Element = ({
    item,
  }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.job}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Heat/Insulation</Text>
        <Text style={styles.title}>Management Platform</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.itemStyle}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Daily Reports</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* 첫 번째 줄 */}
        <View style={styles.buttonRow}>
          <ButtonComponent
            value="Thermal Data"
            iconName="info"
            information="inside Thermal Data"
          >
          </ButtonComponent>
          <ButtonComponent
            value="Sensor Locations"
            iconName="event"
            information="inside Sensor Locations"
          >
          </ButtonComponent>
        </View>
        {/* 두 번째 줄 */}
        <View style={styles.buttonRow}>
          <ButtonComponent
            value="HAVC performance"
            iconName="analytics"
            information="inside HAVC performance"
          >
          </ButtonComponent>
          <ButtonComponent
            value="Sunlight exposure"
            iconName="assignment"
            information="inside Sunlight exposure"
          >
          </ButtonComponent>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 100,
  },
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#8cb0ce",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
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
    alignItems: "center",
    // borderWidth: 1, // Border width
    // borderColor: '#ccc',
    backgroundColor: "rgba(255, 255, 255, 0)", // 흰색의 0% 투명 배경
    marginTop: 20,
    marginBottom: 20,
  },
  statusContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)", // 흰색의 0% 투명 배경
  },
  itemStyle: {
    flex: 1,
    width: "90%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Adjust the value as needed for rounded border
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#5d8bb0",
    padding: 20,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // 버튼 간의 간격 조절
    backgroundColor: "rgba(255, 255, 255, 0)", // 흰색의 0% 투명 배경
  }
});
