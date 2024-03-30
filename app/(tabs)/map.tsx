import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from "expo-status-bar";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";

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


// export default function App() {
//     const [location, setLocation] = useState<LocationObject | null>(null);
//     const [errorMsg, setErrorMsg] = useState<string | null>(null);

//     useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }

//             let subscription = await Location.watchPositionAsync(
//                 { accuracy: Location.Accuracy.High },
//                 (newLocation) => {
//                   setLocation(newLocation);
//                 }
//             );

//             return () => {
//                 if (subscription) {
//                   subscription.remove();
//                 }
//             };
//         })();
//     }, []);

//     return (
//         <View style={{ flex: 1 }}>
//             {location ? (
//                 <MapView
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//                 >
//                 <Marker
//                     coordinate={{
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude,
//                     }}
//                     title="Your Location"
//                     description="This is your current location"
//                 />
//                 </MapView>
//             ) : (
//                 <ActivityIndicator style={{ flex: 1 }} animating size="large" />
//             )}
//             {errorMsg && <Text>{errorMsg}</Text>}
//         </View>
//   );
// }



export default function Map() {
    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Location permission denied');
          return;
        }
        
        console.log('Location permission granted');
        getCurrentLocation();
    };

    const getCurrentLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          console.log('Current location:', location.coords);
        } catch (error) {
          console.error('Error getting current location:', error);
        }
    };

    const [markerInfo, setMarkerInfo] = React.useState(null);

    // Add marker on press event
    const handleMarkerPress = (event: { nativeEvent: { coordinate: any; }; }) => {
        const {coordinate} = event.nativeEvent;
        setMarkerInfo(coordinate);
    };

    const onRegionChange = (region: any) => {
        // To get longitude and latitude
        const longitude = region.longitude;
        const latitude = region.latitude;
        // console.log(region);
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

//     const [location, setLocation] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);

//     useEffect(() => {
//         (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             setErrorMsg('Permission to access location was denied');
//             return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//         })();
//     }, []);

    return (
        <View style={styles.container}>
            <MapView
                    style={styles.map}
                    provider="google"
                    onRegionChange={onRegionChange}
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    onPress={handleMarkerPress}
                    showsUserLocation={true}
                    followsUserLocation={true}
            >
            {showLocationsOfInterest()}
            {markerInfo && <Marker coordinate={markerInfo} />}
            <Marker pinColor="#00ff00" coordinate={{ latitude: 49.20, longitude: -123.12}} />
            </MapView>
            {markerInfo && (
                <View style={{position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: 'white', padding: 10, borderRadius: 10}}>
                    <Text>Location: {JSON.stringify(markerInfo)}</Text>
                </View>
            )}
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
  