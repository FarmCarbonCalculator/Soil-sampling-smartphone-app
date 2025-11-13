import React, { useState, useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { AppleMaps, GoogleMaps } from 'expo-maps';
import {Marker, Callout} from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { RootSiblingParent } from 'react-native-root-siblings';
import { 
 collection, 
// onSnapshot, 
 where, 
 query, 
 getFirestore, 
getDocs, 
} from "firebase/firestore"; 
import 'firebase/compat/storage';
//import {  collection, getDocs } from 'firebase/firestore/lite';




const GeolocationScreen = ({ navigation }) => {


  const route = useRoute()
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldName =route.params?.fieldName; 
    const fieldManagementType =route.params?.fieldManagementType; 
    const samplerID = route.params?.samplerID;
    

    const [inputCoords, setInputCoords] = useState("")
    const [location, setLocation] = useState(null);
    const [sampledPoints, setSampledPoints] = useState(null);


      const findLocation = async () => {

          let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setLocation({
          coords: {latitude: 52.915,
          longitude: -15.731,
        accuracy:1000}});
        return;
      }

        let position = await Location.getCurrentPositionAsync({});
      setLocation(position);
         console.log(location);
    };




    const pastedCoords2 = () => {


 if (inputCoords.split(/[ ,]+/).length == 2 & Number(inputCoords.split(/[ ,]+/)[0]) >= -90 &
  Number(inputCoords.split(/[ ,]+/)[0]) <= 90 &
  Number(inputCoords.split(/[ ,]+/)[1]) >= -180 &
  Number(inputCoords.split(/[ ,]+/)[1]) <= 180 ) {
 


  setLocation({coords:{ 
  latitude: Number(inputCoords.split(/[ ,]+/)[0]), 
  longitude: Number(inputCoords.split(/[ ,]+/)[1]), 
  accuracy: 0}});

  // console.log(currentLocation);
  // console.log(sampledPoints);
  } else {
    console.log("input is not valid")
  };
       
  
 };





const firestore = getFirestore();


async function getSampledPoints() {
  const points = query(collection(getFirestore(), 'samplePoint'),where("farmName", "==", farmName),where("farmName", "!=", ""));
  const pointsSnapshot = await getDocs(points);
  const pointsList = pointsSnapshot.docs.map(doc => doc.data());
  setSampledPoints(pointsList);
console.log(sampledPoints);
  return pointsList;
  
}


async function requestYear(year) {
  const points = query(collection(getFirestore(), 'samplePoint'),where("farmName", "==", farmName),where("farmName", "!=", ""),where("projectYear", "==", year));
  const pointsSnapshot = await getDocs(points);
  const pointsList = pointsSnapshot.docs.map(doc => doc.data());
  setSampledPoints(pointsList);
console.log(sampledPoints);
  return pointsList;
  
}



  useEffect(() => {

   getSampledPoints();

    findLocation();


 }, []);


const chooseCustomLoc = (e) => {
  setLocation({coords:{ 
  latitude: e.nativeEvent.coordinate.latitude, 
  longitude: e.nativeEvent.coordinate.longitude, 
  accuracy: 0}});
  console.log(location)
};

const skipLoad = () => {
  setLocation({coords:{ 
  latitude: 52.915,
  longitude: -15.731, 
  accuracy: 1000}});
};

 
if (location) {
   getSampledPoints;
        return (
        <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
          <View style = {styles.container}>
                    <View style = {{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                  width: '40%'
              }}><Text style={styles.buttonText}>Show points only from project year:</Text>
                      <TextInput style={styles.TextInput} onChangeText={newText => requestYear(newText.trim())}
                        keyboardType="numeric"/>
                        </View>

 <TouchableOpacity style={styles.btLogin2}  onPress={findLocation} >
          <Text adjustsFontSizeToFit={true}
numberOfLines={1}
style={styles.buttonText1}>Find my location</Text>
        </TouchableOpacity>
         <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Location accuracy: <Text style = {{
      fontSize: 15,
      color: "#ffffff",
      backgroundColor: (location.coords.accuracy <= 10)? "green" : "red"
    }}>{Math.round(location.coords.accuracy)}m</Text></Text>
        </View>



                  <View style={{ flexDirection:'row' }}>
        <TextInput style={styles.TextInput}
         placeholder="Paste coordinates"
       // keyboardType="numeric"
       //  defaultValue={inputCoords}
         onChangeText={newText => setInputCoords(newText)}
         // onEndEditing={pastedCoords}
          ></TextInput>
        <TouchableOpacity style={ {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginTop: 12,
      marginBottom: 12,
      width: "40%",
      alignItems: "center",
    }}  
    onPress = {pastedCoords2} 
    >
          <Text style={styles.buttonText1}>Submit</Text>
        </TouchableOpacity>
        </View>

<View style={styles.camera}>
        <MapView
       // showUserLocation = {true}
            provider={PROVIDER_GOOGLE}
            mapType="hybrid" 
            style={styles.map}
            region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                  onPress={(e) => chooseCustomLoc(e)}     
          >
  <Marker 
    coordinate={{
    longitude: parseFloat(location.coords.longitude), 
    latitude: parseFloat(location.coords.latitude) }}
    pinColor = "tomato"
    >
      </Marker>
 {sampledPoints && sampledPoints.map((e, i) => (
  <Marker 
    key = {i}
    coordinate={{
    longitude: parseFloat(e.longitude), 
    latitude: parseFloat(e.latitude) }}
    title = {e.farmName}
    description = {e.fieldName}
    pinColor = {(e.farmName == "Current location")? "tomato" : (e.agS == true )? "blue" : (e.VESSTop != "" )? "turquoise" : "indigo"}
    onPress={() => navigation.navigate('Update point data', {pointDocRef: `${e.projectYear}_${e.latitude} ${e.longitude}`})}
    >
              <Callout tooltip style={styles.callout}>
               <View style={styles.title}>
            <Text style={{ fontWeight: "bold" }}>{e.farmName}</Text>
          </View>
          <View style={styles.buttonText}>
            <Text >{e.fieldName}</Text>
          </View> 
              </Callout>
      </Marker>))
}

          </MapView>
   </View>


  <TouchableOpacity style={styles.btLogin1}
          title="Add point data"
          onPress={() => navigation.navigate('Sample point data', {  latitude: `${location.coords.latitude}`, longitude:   `${location.coords.longitude}`,
          samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})}>
          <Text style={styles.buttonText1}>Add point data</Text>
        </TouchableOpacity> 


     

        </View>
      
      </KeyboardAwareScrollView>
      </RootSiblingParent>

    );
} else if (!location ) {
  return (
            <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
          <View style = {styles.container}>
                    <View style = {{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                  width: '40%',
                 paddingTop: "50%"
              }}></View>
<Text>Searching for your location</Text>
  <TouchableOpacity style={{borderWidth: 1.5,
      borderColor: "red",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#ffffff",
      padding: 7,
      borderRadius: 5,
      marginTop: 12,
      marginBottom: 12,
      width: "67%",
      alignItems: "center"}}
          title="Add point data"
          onPress={skipLoad}>
          <Text>Skip</Text>
        </TouchableOpacity>


  

        </View>
      
      </KeyboardAwareScrollView>
      </RootSiblingParent>
  )
}
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    camera: {
      marginTop: '5%',
      marginBottom: 10,
      aspectRatio: 1.3,
      flex: 0.8,
      borderWidth: 1.5,
      borderColor: "#116038",
      width: '95%',
    height: '50%',
    },
    buttonContainer: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
    },
    buttonText: {
      fontSize: 15,
      color: "#116038",
      marginTop: 6,
    },
    buttonText1: {
      fontSize: 16,
      color: "#fff",
      flexShrink: 1
    },
    btLogin1: {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginTop: 12,
      marginBottom: 12,
      width: "67%",
      alignItems: "center",
    },
    btLogin2: {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginTop: 12,
      marginBottom: 1,
      width: "67%",
      alignItems: "center",
    },
    TextInput: {
      height: 30,
      paddingLeft: 10,
      borderRadius: 5,
      borderColor: "#116038",
      borderWidth: 1,
      borderBottomWidth: 1,
      marginTop: 10,
      borderBottomColor: "#116038",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      width: "40%",
    },
    callout: {
      backgroundColor: 'white',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    }
  });

  export default GeolocationScreen;