import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootSiblingParent } from 'react-native-root-siblings';



const AfterSave = ({ navigation }) => {

    const route = useRoute()
    const latitude = route.params?.latitude
    const longitude = route.params?.longitude
    const project = route.params?.project;
    const projectYear = route.params?.projectYear;
    const farmName = route.params?.farmName;
    const fieldManagementType =route.params?.fieldManagementType;
    const fieldName =route.params?.fieldName;
    const samplerID = route.params?.samplerID; 

  
  
    return (
      <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
        <View style = {styles.container}>
     
        
        <View style={styles.buttonContainer1}>
          <Text style={styles.buttonText2}>Point data successfully saved</Text>
        </View>
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

              
      <TouchableOpacity style={styles.btLogin1}  onPress={() => navigation.navigate('Sample point location', {
          samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})}>
        <Text style={styles.buttonText1}>Add a new point</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btLogin1}
          title="Camera screen"
          onPress={() => navigation.navigate('Camera screen', {latitude: latitude, longitude: longitude, photoname: `${projectYear}_${latitude} ${longitude}`,samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})}>
          <Text style={styles.buttonText1}>Take a photo</Text>
        </TouchableOpacity>    
      <TouchableOpacity style={styles.btLogin1}  onPress={() => navigation.navigate('Field sample bag refs', {latitude: latitude, longitude: longitude,
          samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})}>
        <Text style={styles.buttonText1}>Add field sample bag refs</Text>
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


  export default AfterSave;