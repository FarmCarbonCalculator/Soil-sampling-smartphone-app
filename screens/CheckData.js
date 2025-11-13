import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootSiblingParent } from 'react-native-root-siblings';
import  {getFirestore, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";


const CheckData = ({ navigation }) => {

    const route = useRoute()
    const latitude = route.params?.latitude
    const longitude = route.params?.longitude
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldManagementType = route.params?.fieldManagementType;
    const fieldName =route.params?.fieldName;
    const samplerID = route.params?.samplerID; 
    const vessTop = route.params?.vessTop;
    const vessBottom = route.params?.vessBottom;
    const earthworm = route.params?.earthworm;
    const infiltration = route.params?.infiltration
    const agS = route.params?.agS;
    const agSRef = route.params?.agSRef;
    const labSample = route.params?.labSample;

    const doesItemExist = async () => {
      try {
        const data = await AsyncStorage.getItem('sampledPointsLocal');
        if (data) return true;
      } catch (e) {
        return false;
      }
    };
    
    
    const firestore = getFirestore();
    const saveData = async () => {
 
      const localItemsCheck = await doesItemExist()

 
    setDoc(doc(firestore,"samplePoint", `${projectYear}_${latitude} ${longitude}`), {
      latitude: latitude,
      longitude: longitude,
      VESSTop: vessTop,
      VESSBottom: vessBottom, 
      earthworms: earthworm,
      infiltration: infiltration, 
      agS: agS,
      agSRef: agSRef,
      agStability5mins1: "",
      agStability5mins2: "",
      agStability5mins3: "",
      agStability120mins1: "",
      agStability120mins2: "",
      agStability120mins3: "",
      samplerID: samplerID,
      project: project,
      projectYear: projectYear,
      farmName: farmName,
      fieldName: fieldName,
      labSample: labSample,
      createdAt: serverTimestamp()
  
    })




    if (localItemsCheck) {
      const arr = JSON.parse([await AsyncStorage.getItem("sampledPointsLocal")])
      console.log(arr);
    arr.push({ latitude: latitude,
      longitude: longitude,
      VESSTop: vessTop,
      VESSBottom: vessBottom, 
      earthworms: earthworm,
      infiltration: infiltration, 
      agS: agS,
      agSRef: agSRef,
      agStability5mins1: "",
      agStability5mins2: "",
      agStability5mins3: "",
      agStability120mins1: "",
      agStability120mins2: "",
      agStability120mins3: "",
      samplerID: samplerID,
      project: project,
      projectYear: projectYear,
      farmName: farmName,
      fieldName: fieldName,
      labSample: labSample})
    AsyncStorage.setItem('sampledPointsLocal', JSON.stringify(arr))
    } else {
    AsyncStorage.setItem("sampledPointsLocal", JSON.stringify([{latitude: latitude,
      longitude: longitude,
      VESSTop: vessTop,
      VESSBottom: vessBottom, 
      earthworms: earthworm,
      infiltration: infiltration, 
      agS: agS,
      agSRef: agSRef,
      agStability5mins1: "",
      agStability5mins2: "",
      agStability5mins3: "",
      agStability120mins1: "",
      agStability120mins2: "",
      agStability120mins3: "",
      samplerID: samplerID,
      project: project,
      projectYear: projectYear,
      farmName: farmName,
      fieldName: fieldName,
      labSample: labSample}]))
    } 




    let toast = Toast.show('Data saved', {
      duration: Toast.durations.SHORT,
    });
    navigation.navigate('Data saved', {latitude: latitude, longitude: longitude, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType})
      }

  
  
    return (
      <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
        <View style = {styles.container}>
     
        
        <View style={styles.buttonContainer1}>
          <Text style={styles.buttonText2}>You have not added VESS data for this point.</Text>
        </View>


              
        <TouchableOpacity style={styles.btLogin1} onPress={saveData}>
          <Text style={styles.buttonText1}>Save anyway</Text>
        </TouchableOpacity>
     
      <TouchableOpacity style={styles.btLogin1}  onPress={() =>  navigation.navigate('Sample point data', {latitude: latitude, longitude: longitude, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType,
      vessTop: vessTop,
      vessBottom: vessBottom, 
      earthworm: earthworm,
      infiltration: infiltration, 
      agS: agS,
      agSRef: agSRef,
      labSample: labSample
    })}>
        <Text style={styles.buttonText1}>Go back</Text>
      </TouchableOpacity>
      
  
      
      </View>
      </KeyboardAwareScrollView>
      </RootSiblingParent>
    );
  
  
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: '5%',
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    buttonContainer: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      marginTop: '2%'
    },
    buttonContainer1: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: '2%',
        marginBottom: "10%"
      },
    buttonText: {
      fontSize: 15,
      color: "#116038",
      marginTop: 6,
    },
    buttonText2: {
      fontSize: 18,
      color: "#116038",
      flexShrink: 1
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
      marginTop: "10%",
      marginBottom: 12,
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
      width: "52%",
    },
    checkboxWrapper: {
      flexDirection: 'row',
      width: "30%",
      //height: "10%",
      aspectRatio: 1,
      alignItems: 'center',
      paddingVertical: 5,
      paddingLeft: "5%",
      marginTop: "50%",
      marginHorizontal: "10%",
      marginBottom: "5%"

    }
  });


  export default CheckData;