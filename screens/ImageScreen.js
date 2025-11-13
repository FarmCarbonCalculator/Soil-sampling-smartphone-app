import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import  {getFirestore, setDoc, doc} from 'firebase/firestore';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import { firebase} from "../firebase-config";



const AddImage = ({navigation}) => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const route = useRoute()
    const photoname = route.params?.photoname;
    const latitude = route.params?.latitude;
    const longitude = route.params?.longitude;
  const photo_from_camera = route.params?.photo
  const project = route.params?.project;
  const projectYear = route.params?.projectYear;
  const farmName = route.params?.farmName;
  const fieldName =route.params?.fieldName;
  const samplerID = route.params?.samplerID;
  const fieldManagementType =route.params?.fieldManagementType;

  

    
    const uploadImage = async () => {

      setImage(photo_from_camera.uri);
      console.log(`${photo_from_camera.uri.substring(56,79)}`)


      


      const blob =  await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', photo_from_camera.uri, true);
        xhr.send(null);
      })
      
      const ref = firebase.storage().ref().child(`${photo_from_camera.uri.substring(56,82)}`)
      const snapshot = ref.put(blob)
      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          setUploading(true)
        },
        (error) => {
          setUploading(false)
          console.log(error)
          blob.close()
          return 
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false)
            setImage(url)
            const firestore = getFirestore();
            setDoc(doc(firestore,"Photos", `${photo_from_camera.uri.substring(56,82)}`), {
              url: url,
              latitude: latitude,
              longitude: longitude,
              project: project,
              farmName: farmName,
              fieldName: fieldName
            
            })
            blob.close()
            return url
          })
        }
        )

        let toast = Toast.show('Image saved', {
            duration: Toast.durations.SHORT,
          });

          navigation.navigate('Sample point data',{latitude: latitude, longitude: longitude,
            samplerID : samplerID, project: project, projectYear: projectYear, farmName: farmName, fieldName: fieldName,fieldManagementType:  fieldManagementType})
    }
  
    return (
    <RootSiblingParent> 
      <View style={styles.container}>
        {photo_from_camera.uri && <Image source={{uri: photo_from_camera.uri}} style={{width: 170 , height: 200}}/>}
      <TouchableOpacity style={styles.btLogin1} onPress={uploadImage}>
        <Text style={styles.buttonText1}>Upload image</Text>
      </TouchableOpacity>
      </View>
    </RootSiblingParent>
    );
  
  
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      paddingTop: '15%',
      marginBottom: 0
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
  });

  export default AddImage;