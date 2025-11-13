import  {getFirestore, setDoc, writeBatch, doc, serverTimestamp} from 'firebase/firestore';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const UploadBackup = ({navigation}) => {


const [count, setCount] = useState(0)
   
      const firestore = getFirestore();

const deleteJSON = async () => {
    AsyncStorage.removeItem('sampledPointsLocal');
    navigation.navigate('Project home')
    
}

const loadJSON = async () => {

    const modified = await AsyncStorage.getItem("sampledPointsLocal")

    const jsonToLoad = JSON.parse(modified)

    console.log(jsonToLoad) 

             var counter = 0;
            const batch = writeBatch(firestore);
    
            jsonToLoad.forEach(document => {
                    batch.set(doc(firestore,"samplePoint",`${document.projectYear}_${document.latitude} ${document.longitude}`),
                    {latitude: document.latitude,
                    longitude: document.longitude,
                    VESSTop: document.VESSTop,
                    VESSBottom: document.VESSBottom, 
                    earthworms: document.earthworms,
                    infiltration: document.infiltration, 
                    agS: document.agS,
                    agSRef: document.agSRef,
                    agStability5mins1: document.agStability5mins1,
                    agStability5mins2: document.agStability5mins2,
                    agStability5mins3: document.agStability5mins3,
                    agStability120mins1: document.agStability120mins1,
                    agStability120mins2: document.agStability120mins2,
                    agStability120mins3: document.agStability120mins3,
                    samplerID: document.samplerID,
                    project: document.project,
                    projectYear: document.projectYear,
                    farmName: document.farmName,
                    fieldName: document.fieldName,
                    labSample: document.labSample,
                    createdAt: serverTimestamp()}, { merge: true }
                    );
                    console.log(`${document.projectYear}_${document.latitude} ${document.longitude}`)
                    counter = counter + 1;
                    setCount(counter);
                console.log(counter)
            });
            batch.commit();
    }





return (

      <View style = {styles.container}>



      <TouchableOpacity style={styles.btLogin1}  onPress={loadJSON}>
        <Text style={styles.buttonText1}>Upload all backed up points</Text>
      </TouchableOpacity>


      <Text>Points uploaded: {count}</Text>

<View style = {styles.container2}>
      <TouchableOpacity style={styles.btLogin1}  onPress={deleteJSON}>
        <Text style={styles.buttonText1}>DELETE all backed up points</Text>
      </TouchableOpacity>
      <Text style={{ height: 30,
      padding: 5,
      borderRadius: 5,
      borderColor: "red",
      borderWidth: 1,
      borderBottomWidth: 1,
      marginTop: 10,
      borderBottomColor: "#116038",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      width: "100%"}}>this can not be undone</Text>

      </View>
</View>

    );

   

}
 const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: "center",
          marginTop: '1%',
          marginBottom: 0,
          backgroundColor: "#fff",
          marginLeft: '1%',
          marginRight :'1%',
          paddingTop: "40%"
        },
        container2: {
          flex: 1,
          alignItems: "center",
          marginTop: '1%',
          marginBottom: 0,
          backgroundColor: "#fff",
          marginLeft: '1%',
          marginRight :'1%',
          paddingTop: "20%"
        },
        container1: {
          flex: 1,
          alignItems: "center",
          marginTop: '10%',
          marginBottom: "10%",
          backgroundColor: "#fff",
          marginLeft: '1%',
          marginRight :'1%'
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

    });

export default UploadBackup;