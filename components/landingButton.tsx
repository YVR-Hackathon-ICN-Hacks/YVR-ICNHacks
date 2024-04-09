import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { buttonComponentProps, NavigationParamList } from "@/types/types";

const ButtonComponent: React.FC<buttonComponentProps> = ({
  value,
  iconName,
  information,
}) => {
  const navigation = useNavigation<NavigationParamList>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("pages", { context: information })}
    >
      <MaterialIcons name={iconName} style={styles.iconStyle}></MaterialIcons>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  text: {
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "48%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  iconStyle: {
    fontSize: 25,
    marginLeft: 10,
  },
  buttonText: {
    color: "#5d8bb0",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 30,
  },
});

export default ButtonComponent;
