import  {getFirestore, setDoc, writeBatch, doc, serverTimestamp} from 'firebase/firestore';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";


const BatchWrite = () => {

    const [jsonToLoad, setJsonToLoad] = useState(  )
      const firestore = getFirestore();

const loadJSON = () => {

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
                console.log(counter)
            });
            batch.commit();
    }



    const [farmNamesToLoad, setFarmNamesToLoad] = useState([{"farmName":"BARNSIDE FARM (CARLIN FARMS LTD)","id":1},{"farmName":"BOOTH HOUSE","id":2},{"farmName":"CARTER PLANTATION FARM","id":3},{"farmName":"HINCHLIFFE PARTNERSHIP","id":4},{"farmName":"HOLMROYD NOOK","id":5},{"farmName":"LAND AT HELME","id":6},{"farmName":"LONGLEY FARM","id":7},{"farmName":"LOWER ROYD","id":8},{"farmName":"MAGDALE FIELDS","id":9},{"farmName":"MOORFIELD FARM","id":10},{"farmName":"OLDFIELD ROAD FARM","id":11},{"farmName":"PYE FLATTS MEADOWS SSSI","id":12},{"farmName":"ROSEWOOD CROFT FARM","id":13},{"farmName":"ROYD FARM","id":14},{"farmName":"STIRLEY FARM (YORKSHIRE WILDLIFE TRUST)","id":15},{"farmName":"UPPER HEY","id":16},{"farmName":"WOOD NOOK FARM","id":17}]  )

    const loadFarmNames = () => {

      var counter = 0;
      const batch = writeBatch(firestore);

      farmNamesToLoad.forEach(document => {
              batch.set(doc(firestore,"Project/NATURES HOLME/FarmNames",`${document.farmName}`),
              {title: document.farmName,
                id: document.id
              }, { merge: true }
              );
              console.log(`${document.farmName}`)
              counter = counter + 1;
          console.log(counter)
      });
      batch.commit();
}





return (

      <View style = {styles.container}>



      <TouchableOpacity style={styles.btLogin1}  onPress={loadJSON}>
        <Text style={styles.buttonText1}>Batch write data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btLogin1}  onPress={loadFarmNames}>
        <Text style={styles.buttonText1}>Save farm names</Text>
      </TouchableOpacity>



      
  
      
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
          marginRight :'1%'
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
        }
    });

export default BatchWrite;