import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = ({ navigation }) => {



    const route = useRoute()
    const photoname = route.params?.photoname;
    const latitude = route.params?.latitude;
    const longitude = route.params?.longitude;
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldName =route.params?.fieldName;
    const samplerID = route.params?.samplerID;
    const fieldManagementType =route.params?.fieldManagementType;

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      navigation.navigate('Add image', {latitude: latitude, longitude: longitude, photo: photo, photoname: photoname, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType})
    }
  };



  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={takePicture} 
          style={{ 
    width: '20%',
   // height: '10%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  fontSize: 18, marginBottom: 10 }}>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;