import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from "expo-status-bar";

let locationsOfInterest = [
    {
        title: "BCIT Downtown Campus",
        location: {
            latitude: 49.28361903764901,
            longitude: -123.11531917533154
        },
        description: "My First Marker"
    },
    {
        title: "Cavo Bar + Kitchen",
        location: {
            latitude: 49.280909118415785,
            longitude: -123.12163863100838
        },
        description: "good good pasta"
    }
]

// export default function Map() {
//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 provider = {PROVIDER_GOOGLE}
//                 initialRegion = {{
//                     latitude: 49.2827,
//                     longitude: -123.1207,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421
//                 }}
//                 showsUserLocation = {true}
//                 showsMyLocationButton
//             />
//         </View>
//     )
// }

export default function Map() {
    const [count, setCount] = useState(0);

    const onRegionChange = (region: any) => {
        // To get longitude and latitude
        const longitude = region.longitude;
        const latitude = region.latitude;
        console.log(region);
    }

    // Add markers to the map (pin icon)
    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                />
            )
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                    style={styles.map}
                    onRegionChange={onRegionChange}
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
            >
            {showLocationsOfInterest()}

            <Marker pinColor="#00ff00" coordinate={{ latitude: 49.20, longitude: -123.12}} />
            </MapView>
            <StatusBar style="auto" />
        </View>
    );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    map: {
        width: '100%',
        height: '100%'
    }
  });
  