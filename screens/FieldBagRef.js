import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  {getFirestore, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Checkbox from 'expo-checkbox';


const FieldBagRef = ({ navigation }) => {

    const route = useRoute()
    const latitude = route.params?.latitude
    const longitude = route.params?.longitude
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldName =route.params?.fieldName;
    const fieldManagementType = route.params?.fieldManagementType;
    const samplerID = route.params?.samplerID; 
    const [bagRef0_10OM, setBagRef0_10OM] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRef10_30OM, setBagRef10_30OM] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRef30_50OM, setBagRef30_50OM] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRef0_10BD, setBagRef0_10BD] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRef10_30BD, setBagRef10_30BD] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRef30_50BD, setBagRef30_50BD] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);
    const [bagRefNutAn, setBagRefNutAn] = useState(`${projectYear}_${project}.${farmName}.${fieldName}`);

    
    
    const firestore = getFirestore();
    const saveData = () => {
 
    setDoc(doc(firestore,"fieldBagRef", fieldName+`${projectYear}_${latitude} ${longitude}`), {
      project: project,
      projectYear: projectYear,
      farmName: farmName,
      fieldName: fieldName,
      fieldManagementType : fieldManagementType,
      bagRef0_10OM: bagRef0_10OM,
      bagRef10_30OM: bagRef10_30OM,
      bagRef30_50OM: bagRef30_50OM,
      bagRef0_10BD: bagRef0_10BD,
      bagRef10_30BD: bagRef10_30BD,
      bagRef30_50BD: bagRef30_50BD,
      bagRefNutAn: bagRefNutAn,
      createdAt: serverTimestamp()
  
    })
    let toast = Toast.show('Data saved', {
      duration: Toast.durations.SHORT,
    });

    navigation.navigate('Sample point data',{latitude: latitude, longitude: longitude, samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,  fieldManagementType: fieldManagementType})
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
          <Text style={styles.buttonText}>Field management: {fieldManagementType} </Text>
        </View>


        <View style={styles.buttonContainer1}>
          <Text style={styles.buttonText}>Nutrient analysis bag ref</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setBagRefNutAn(newText)}
          defaultValue={bagRefNutAn} placeholder="Nutrient analysis sample ref"/>
        </View>

  
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Organic matter bag ref 0 to 10cm</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setBagRef0_10OM(newText)}
          defaultValue={bagRef0_10OM} placeholder="Organic matter ref 0 to 10cm"/>
        </View>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Organic matter bag ref 10 to 30cm</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setBagRef10_30OM(newText)}
          defaultValue={bagRef10_30OM} placeholder="Organic matter ref 10 to 30cm"/>
        </View>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Organic matter bag ref 30 to 50cm</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setBagRef30_50OM(newText)}
          defaultValue={bagRef30_50OM} placeholder="Organic matter ref 30 to 50cm"/>
        </View>
 

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Bulk density bag ref 0 to 10cm</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setBagRef0_10BD(newText)}
          defaultValue={bagRef0_10BD} placeholder="Bulk density ref 0 to 10cm"/>
        </View>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Bulk density bag ref 10 to 30cm</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setBagRef10_30BD(newText)}
          defaultValue={bagRef10_30BD} placeholder="Bulk density ref 10 to 30cm"/>
        </View>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Bulk density bag ref 30 to 50cm</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setBagRef30_50BD(newText)}
          defaultValue={bagRef30_50BD} placeholder="Bulk density ref 30 to 50cm"/>
        </View>
      
  
        <TouchableOpacity style={styles.btLogin1} onPress={saveData}>
          <Text style={styles.buttonText1}>Save sample bag refs</Text>
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
      marginTop: '1%',
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    buttonContainer: {
        backgroundColor: "transparent",
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 10,
    },
    buttonContainer1: {
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
      marginTop: "5%"
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
      marginBottom: "3%"
    },
    TextInput1: {
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
      marginBottom: "12%"
    },
    checkboxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingLeft: 10,
      marginTop: 10,
      marginHorizontal: 10
    }
  });


  export default FieldBagRef;