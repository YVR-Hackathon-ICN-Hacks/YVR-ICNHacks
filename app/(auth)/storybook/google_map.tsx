import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import Geolocation from "react-native-geolocation-service";
import { GOOGLE_MAPS_API_KEY, GOOGLE_PLACES_API_KEY } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";

async function requestLocationPermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "This app needs to access your location in order to show you the map",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.error("granted false");
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    Geolocation.requestAuthorization("whenInUse").then((granted) => {
      if (granted === "granted") {
      } else {
        console.error("granted false - ios");
      }
    });
  }
}

const initialRegion = {
  latitude: 49.2827,
  longitude: -123.1207,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const fetchPlaceId = async (latitude: number, longitude: number) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    if (responseJson.results.length > 0) {
      const placeId = responseJson.results[0].place_id;
      const result = fetchPlaceDetails(placeId);
      return result;
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
  return null;
};

const fetchPlaceDetails = async (placeId: string) => {
  const fields = "name%2Cformatted_phone_number%2Cformatted_address%2Crating";
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    if (responseJson.result) {
      const result = responseJson.result;
      return result;
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
};

export default function GoogleMap() {
  interface Place {
    latitude: number;
    longitude: number;
    name: string | null;
    phone_number: string | null;
    address: string | null;
    rating: number | null;
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const mapRef = useRef<MapView>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

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

  const handleMapPress = async (event: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const placeDetails = await fetchPlaceId(latitude, longitude);
    moveToLocation(latitude, longitude);
    if (placeDetails) {
      setSelectedPlace({
        latitude: latitude,
        longitude: longitude,
        name: placeDetails.name ?? null,
        phone_number: placeDetails.formatted_phone_number ?? null,
        address: placeDetails.formatted_address ?? null,
        rating: placeDetails.rating ?? null,
      });
    }
  };

  const handlePress = async (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null
  ) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      moveToLocation(lat, lng);
      const result = await fetchPlaceDetails(details.place_id);
      setSelectedPlace({
        latitude: lat,
        longitude: lng,
        name: result.name,
        phone_number: result.formatted_phone_number,
        address: result.formatted_address,
        rating: result.rating,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search for places"
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
            components: "country:ca",
          }}
          keyboardShouldPersistTaps="handled"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handlePress(data, details);
            fetchPlaceDetails(details?.place_id ?? "");
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          keepResultsAfterBlur={true}
          enablePoweredByContainer={false}
          styles={{
            textInputContainer: {
              width: "100%",
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              zIndex: 5,
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            listView: {
              position: "absolute",
              top: 42,
              backgroundColor: "white",
              zIndex: 10,
            },
          }}
        />
        <MapView
          ref={mapRef}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          initialRegion={initialRegion}
          style={styles.map}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapPadding={{ top: 50, right: 0, bottom: 0, left: 0 }}
        >
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name ?? ""}
              description={selectedPlace.address ?? ""}
            />
          )}
        </MapView>
        {selectedPlace && (
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{selectedPlace.name}</Text>
              <TouchableOpacity onPress={() => setSelectedPlace(null)}>
                <Icon name="times" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.infoText}>{selectedPlace.address}</Text>
              {selectedPlace.phone_number && (
                <Text style={styles.infoText}>
                  Phone Number: {selectedPlace.phone_number}
                </Text>
              )}
              {selectedPlace.rating && (
                <Text style={styles.infoText}>
                  Rating: {selectedPlace.rating}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
