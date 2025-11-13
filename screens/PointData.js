import React, { useState} from "react";
import { useRoute} from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  {getFirestore, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Checkbox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from 'react-native-element-dropdown';

const PointData = ({ navigation }) => {

    const route = useRoute()
    const latitude = route.params?.latitude
    const longitude = route.params?.longitude
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldManagementType =route.params?.fieldManagementType;
    const fieldName =route.params?.fieldName;
    const samplerID = route.params?.samplerID; 
    const [vessTop, setVessTop] = useState('');
    const [vessBottom, setVessBottom] = useState('');
    const [earthworm, setEarthworm] = useState('');
    const [infiltration, setInfiltration] = useState('');
    const [agS, setAgS] = useState(false);
    const [agSRef, setAgSRef] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [labSample, setLabSample] = useState(false);
    
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


      doesItemExist().then(res=>console.log(res))


      if (vessTop != "") {
 
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
    
    

// doesItemExist().then(res=>setLocalItemExists(res))

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


//const modified = await AsyncStorage.getItem("sampledPointsLocal")
//console.log(JSON.parse(modified)) 


    let toast = Toast.show('Data saved', {
      duration: Toast.durations.SHORT,
    });




    navigation.navigate('Data saved', {latitude: latitude, longitude: longitude, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType})

  } else {
    navigation.navigate('No VESS data', {latitude: latitude, longitude: longitude, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType,
      vessTop: vessTop,
      vessBottom: vessBottom, 
      earthworm: earthworm,
      infiltration: infiltration, 
      agS: agS,
      agSRef: agSRef,
      labSample: labSample
    })

  }

    }
  
    const resetData = () => {
      setVessTop('');
      setVessBottom('');
      setEarthworm('');
      setInfiltration('');
      setLabSample(false);
      setAgS(false);
      setAgSRef('');

    }
    
  
    return (
      <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
        <View style = {styles.container}>
     
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project: {project} </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project year: {projectYear} </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Farm: {farmName} </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Field: {fieldName} </Text>
        </View>


 <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Top VESS score</Text>
           <Text style={{
      fontSize: 20,
      color: "#000",
      marginTop: 6,
paddingLeft: 7,
    }}>{vessTop}</Text>
 <Dropdown
        style={styles.dropdown}
        data={[{"score" : "1"},{"score" : "1.5"},{"score" : "2"},{"score" : "2.5"},{"score" : "3"},{"score" : "3.5"},
          {"score" : "4"},{"score" : "4.5"},{"score" : "5"}]}
        autoScroll = {false}
        maxHeight={300}
        labelField="score"
        valueField="score"
        value={vessTop}
        onChange={item => {
          setVessTop(item.score)
        }}

      />
</View>



 <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Bottom VESS score</Text>
           <Text style={{
      fontSize: 20,
      color: "#000",
      marginTop: 6,
paddingLeft: 7,
    }}>{vessBottom}</Text>
 <Dropdown
        style={styles.dropdown}
        data={[{"score" : "1"},{"score" : "1.5"},{"score" : "2"},{"score" : "2.5"},{"score" : "3"},{"score" : "3.5"},
          {"score" : "4"},{"score" : "4.5"},{"score" : "5"}]}
        autoScroll = {false}
        maxHeight={300}
        labelField="score"
        valueField="score"
        value={vessBottom}
        onChange={item => {
          setVessBottom(item.score)
        }}

      />
</View>




        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Earthworm count</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setEarthworm(newText.trim())}
          defaultValue={earthworm} placeholder="Earthworm count"
            keyboardType="numeric"/>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Infiltration (minutes)</Text>
          <TextInput style={styles.TextInput } onChangeText={newText => setInfiltration(newText.trim())}
          defaultValue={infiltration} placeholder="Infiltration in minutes"
            keyboardType="numeric"/>
        </View>

        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                
                <Text style={styles.buttonTextCheck}>Ag stability</Text>
                <View >
                <Checkbox
                  style={styles.checkboxWrapper}
                  value={agS}
                  onValueChange={setAgS}
                  color={agS ? '#116038' : undefined}
                />
                </View>
        </View>
        <View>              
         {agS &&         
                <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ag stability sample ref</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setAgSRef(newText)}
          defaultValue={agSRef} placeholder="AgS sample ref"/>
        </View>}
</View> 

        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                
                <Text style={styles.buttonTextCheck}>Lab sample taken</Text>
                <View >
                <Checkbox
                  style={styles.checkboxWrapper}
                  value={labSample}
                  onValueChange={setLabSample}
                  color={labSample ? '#116038' : undefined}
                />
                </View>
        </View>
       


  
        <TouchableOpacity style={styles.btLogin1} onPress={saveData}>
          <Text style={styles.buttonText1}>Save sampling point</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btLogin1} onPress={resetData}>
        <Text style={styles.buttonText1}>Clear sampling point</Text>
      </TouchableOpacity>                 
      <TouchableOpacity style={styles.btLogin1}
          title="Camera screen"
          onPress={() => navigation.navigate('Camera screen', {latitude: latitude, longitude: longitude, photoname: `${projectYear}_${latitude} ${longitude}`,samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName, fieldManagementType: fieldManagementType})}>
          <Text style={styles.buttonText1}>Take a photo</Text>
        </TouchableOpacity>    
      <TouchableOpacity style={styles.btLogin1}  onPress={() => navigation.navigate('Field sample bag refs', {latitude: latitude, longitude: longitude,
          samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})}>
        <Text style={styles.buttonText1}>Add sample bag refs</Text>
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
    buttonText: {
      fontSize: 15,
      color: "#116038",
      marginTop: 6,
    },
    buttonTextCheck: {
      fontSize: 15,
      color: "#116038",
      marginTop: 0,
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
  //    width: "40%",
     height: 40,
      aspectRatio: 1,
      alignItems: 'center',
     // paddingVertical: 5,
    //  paddingLeft: "5%",
      marginTop: "12%",
      marginHorizontal: "5%",
      paddingHorizontal: "5%",
      marginBottom: "10%"

    },
    dropdown: {
      height: 30,
      padding: 20,
      borderRadius: 5,
      borderColor: "#116038",
      borderWidth: 1,
      borderBottomWidth: 1,
      marginTop: 20,
      marginBottom: 20,
      borderBottomColor: "#116038",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      width: "25%"
    }
  });


  export default PointData;