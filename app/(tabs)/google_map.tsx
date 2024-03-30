import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const initialRegion = {
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

import Geolocation from "react-native-geolocation-service";

async function requestPermission() {
        try {
            if (Platform.OS === "ios") {
                return await Geolocation.requestAuthorization("always");
            }
            if (Platform.OS === "android") {
                return await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        } catch (e) {
            console.log(e);
        }
}

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

export default function GoogleMap() {
    // const [location, setLocation] = useState();
    // useEffect(() => {
    //     requestPermission().then(result => {
    //       console.log({ result });
    //       if (result === "granted") {
    //         Geolocation.getCurrentPosition(
    //           pos => {
    //             setLocation(pos.coords);
    //           },
    //           error => {
    //             console.log(error);
    //           },
    //           {
    //             enableHighAccuracy: true,
    //             timeout: 3600,
    //             maximumAge: 3600,
    //           },
    //         );
    //       }
    //     });
    // }, []);

    const mapRef = useRef<MapView>(null);

    async function moveToLocation(latitude: any, longitude: any) {
        mapRef.current?.animateToRegion(
            {
                latitude,
                longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },
            2000
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <GooglePlacesAutocomplete 
                    placeholder="Search for places"
                    query={{
                        key: 'AIzaSyDHUtr6H6LiTFH9UxTzNeaLafn2nuckGX8',
                        language: 'en', 
                        components: "country:ca",
                    }}
                    keyboardShouldPersistTaps="handled"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        moveToLocation(details?.geometry.location.lat, details?.geometry.location.lng);
                    }}
                    onFail={(error) => console.log(error)}
                    onNotFound={() => console.log("no results")}
                    keepResultsAfterBlur={true}
                    enablePoweredByContainer={false}
                    styles={{
                        textInputContainer: {
                            width: '100%',
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: 0,
                            zIndex: 5,
                        },
                        textInput: {
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                        },
                        listView: {
                            position: 'absolute',
                            top: 42,
                            backgroundColor: 'white',
                            zIndex: 10,
                        },
                    }}
                
                />
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initialRegion}
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    mapPadding={{ top: 50, right: 0, bottom: 0, left: 0 }}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
