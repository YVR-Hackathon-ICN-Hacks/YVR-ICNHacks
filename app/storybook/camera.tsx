import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<number>(0); // Use 0 for back, 1 for front
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
  
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus.status !== 'granted') {
        Alert.alert('Permission Required', 'This app needs access to your camera roll to save photos.');
      }
    })();
  }, []);
  

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      Alert.alert('Photo Saved', 'Check your camera roll');
      console.log(asset);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.flipButtonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={() => setType(type === 0 ? 1 : 0)}>
            <FontAwesome name="refresh" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.takePhotoButtonContainer}>
          <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  },
  flipButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  flipButton: {
    alignItems: 'center',
  },
  takePhotoButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  takePhotoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
