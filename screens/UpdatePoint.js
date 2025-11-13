import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  {getFirestore, setDoc, doc, deleteDoc,getDoc} from 'firebase/firestore';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Checkbox from 'expo-checkbox';


const UpdatePoint = ({ navigation }) => {

    const route = useRoute()
    const [documentExists, setDocumentExists] = useState(false)
    const pointDocRef = route.params?.pointDocRef
    const [agStability5mins1, setAgStability5mins1] = useState('');
    const [agStability120mins1, setAgStability120mins1] = useState('');
    const [agStability5mins2, setAgStability5mins2] = useState('');
    const [agStability120mins2, setAgStability120mins2] = useState('');
    const [agStability5mins3, setAgStability5mins3] = useState('');
    const [agStability120mins3, setAgStability120mins3] = useState('');
    const [currentSamplerID, setCurrentSamplerID] = useState('');
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('');
    const [currentProject, setCurrentProject] = useState('');
    const [currentProjectYear, setCurrentProjectYear] = useState('');
    const [resamplingYear, setResamplingYear] = useState(JSON.stringify(Number(currentProjectYear)+1))
    const [currentFarmName, setCurrentFarmName] = useState('');
    const [currentFieldName, setCurrentFieldName] = useState('');
    const [currentAgStability5mins1, setCurrentAgStability5mins1] = useState('');
    const [currentAgStability120mins1, setCurrentAgStability120mins1] = useState('');
    const [currentAgStability5mins2, setCurrentAgStability5mins2] = useState('');
    const [currentAgStability120mins2, setCurrentAgStability120mins2] = useState('');
    const [currentAgStability5mins3, setCurrentAgStability5mins3] = useState('');
    const [currentAgStability120mins3, setCurrentAgStability120mins3] = useState('');
    const [currentVessTop, setCurrentVessTop] = useState('');
    const [currentVessBottom, setCurrentVessBottom] = useState('');
    const [currentEarthworm, setCurrentEarthworm] = useState('');
    const [currentInfiltration, setCurrentInfiltration] = useState('');
    const [currentLabSample, setCurrentLabSample] = useState(false);
    const [currentAgS, setCurrentAgS] = useState(false);
    const [currentAgSRef, setCurrentAgSRef] = useState('');

  

    
    const firestore = getFirestore();
    const pointRef = doc(firestore, 'samplePoint', pointDocRef);
    
    const updateData = () => {
if (documentExists) {
    setDoc(pointRef, { 
      fieldName: currentFieldName,
      VESSTop: currentVessTop,
      VESSBottom: currentVessBottom, 
      earthworms: currentEarthworm,
      infiltration: currentInfiltration, 
      agS: currentAgS,
      agStability5mins1:  agStability5mins1,
      agStability5mins2: agStability5mins2,
      agStability5mins3: agStability5mins3,
      agStability120mins1: agStability120mins1,
      agStability120mins2: agStability120mins2,
      agStability120mins3: agStability120mins3, 
    }, { merge: true });
 
    let toast = Toast.show('Data updated', {
      duration: Toast.durations.SHORT,
    });
  }


    }


    const deletePoint = async() => {
      if (documentExists) {
        await deleteDoc(pointRef);
        setDocumentExists(false);

        let toast = Toast.show('Point deleted', {
          duration: Toast.durations.SHORT,
        });
    }}


const showData = async() => {

const docSnap = await getDoc(pointRef);

if (docSnap.exists()) {
  setCurrentSamplerID(docSnap.data().samplerID)
  setCurrentProject(docSnap.data().project)
  setCurrentProjectYear(docSnap.data().projectYear)
  setCurrentFarmName(docSnap.data().farmName)
  setCurrentLatitude(docSnap.data().latitude)
  setCurrentLongitude(docSnap.data().longitude)
  setCurrentFieldName(docSnap.data().fieldName)
  setCurrentLabSample(docSnap.data().labSample)
  setCurrentAgStability5mins1(docSnap.data().agStability5mins1)
  setCurrentAgStability120mins1(docSnap.data().agStability120mins1)
  setCurrentAgStability5mins2(docSnap.data().agStability5mins2)
  setCurrentAgStability120mins2(docSnap.data().agStability120mins2)
  setCurrentAgStability5mins3(docSnap.data().agStability5mins3)
  setCurrentAgStability120mins3(docSnap.data().agStability120mins3)
  setCurrentVessTop(docSnap.data().VESSTop)
  setCurrentVessBottom(docSnap.data().VESSBottom)
  setCurrentEarthworm(docSnap.data().earthworms)
  setCurrentInfiltration(docSnap.data().infiltration) 
  setCurrentAgS(docSnap.data().agS)
  setCurrentAgSRef(docSnap.data().agSRef)
  setDocumentExists(true)
    console.log(currentProject)
  console.log("Document data:", docSnap.data());
  //setResamplingYear(JSON.stringify(Number(currentProjectYear)+1))
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
  setDocumentExists(false)
}
}

    
  
    return (
      <RootSiblingParent> 
      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
        <View style = {{
      flex: 1,
      alignItems: "center",
      marginTop: '1%',
      marginBottom: 0,
      backgroundColor: "#fff",
      marginLeft: 1,
      marginRight :1
    }}>
     {documentExists && <View style = {styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sampler ID: <Text style={styles.TextInput}>{currentSamplerID}</Text> </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project: <Text style={styles.TextInput}>{currentProject}</Text> </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project year: <Text style={styles.TextInput}>{currentProjectYear}</Text> </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Farm name: <Text style={styles.TextInput}>{currentFarmName}</Text> </Text> 
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Field name:</Text>
        <TextInput style={styles.TextInput} onChangeText={newText => setCurrentFieldName(newText.trim())}
          defaultValue={currentFieldName} placeholder={currentFieldName}/>
          </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ag stability sample ref: <Text style={styles.TextInput}>{currentAgSRef}</Text> </Text>
        </View>

        </View>
}

  
  {documentExists && <View style = {styles.container1}>
   

  <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Top VESS score</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setCurrentVessTop(newText.trim())}
          defaultValue={currentVessTop} placeholder={currentVessTop}
            keyboardType="numeric"/>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Bottom VESS score</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setCurrentVessBottom(newText.trim())}
          defaultValue={currentVessBottom} placeholder={currentVessBottom}
            keyboardType="numeric"/>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Earthworm count</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setCurrentEarthworm(newText.trim())}
          defaultValue={currentEarthworm} placeholder={currentEarthworm}
            keyboardType="numeric"/>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Infiltration (minutes)</Text>
          <TextInput style={styles.TextInput } onChangeText={newText => setCurrentInfiltration(newText.trim())}
          defaultValue={currentInfiltration} placeholder={currentInfiltration}
            keyboardType="numeric"/>
        </View>

        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                
                <Text style={styles.buttonTextCheck}>Ag stability</Text>
                <View >
                <Checkbox
                  style={styles.checkboxWrapper}
                  value={currentAgS}
                  onValueChange={setCurrentAgS}
                  color={currentAgS ? '#116038' : undefined}
                />
                </View>
        </View>


        <View style={[{flexDirection:'row', alignItems:'center'}]}>
                
                <Text style={styles.buttonTextCheck}>Lab sample taken</Text>
                <View >
                <Checkbox
                  style={styles.checkboxWrapper}
                  value={currentLabSample}
                  onValueChange={setCurrentLabSample}
                  color={setCurrentLabSample ? '#116038' : undefined}
                />
                </View>
        </View>
  

    <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 5 mins (1):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability5mins1(newText.trim())}
          defaultValue={agStability5mins1} placeholder={currentAgStability5mins1}
            keyboardType="numeric"/>
        </View>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 5 mins (2):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability5mins2(newText.trim())}
          defaultValue={agStability5mins2} placeholder={currentAgStability5mins2}
            keyboardType="numeric"/>
        </View>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 5 mins (3):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability5mins3(newText.trim())}
          defaultValue={agStability5mins3} placeholder={currentAgStability5mins3}
            keyboardType="numeric"/>
        </View>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 120 mins (1):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability120mins1(newText.trim())}
          defaultValue={agStability120mins1} placeholder={currentAgStability120mins1}
            keyboardType="numeric"/>
        </View>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 120 mins (2):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability120mins2(newText.trim())}
          defaultValue={agStability120mins2} placeholder={currentAgStability120mins2}
            keyboardType="numeric"/>
        </View>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
  }}>
          <Text style={styles.buttonText}>Aggregate stability 120 mins (3):</Text>
          <TextInput style={styles.TextInput1} onChangeText={newText => setAgStability120mins3(newText.trim())}
          defaultValue={agStability120mins3} placeholder={currentAgStability120mins3}
            keyboardType="numeric"/>
        </View>

    

        <TouchableOpacity style={styles.btLogin11} onPress={updateData}>
          <Text style={styles.buttonText1}>Update sampling point</Text>
        </TouchableOpacity> 


        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      marginTop: "10%",
      marginBottom: "10%"
  }}>
        <View style = {{
      backgroundColor: "transparent",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 10,
      width: '20%'
  }}>
          <Text style={styles.buttonText}>Year of resampling:</Text>
          <TextInput style={styles.TextInput2} onChangeText={newText => setResamplingYear(newText.trim())}
          defaultValue={JSON.stringify(Number(currentProjectYear)+1)} placeholder={JSON.stringify(Number(currentProjectYear)+1)}
            keyboardType="numeric"/>
        </View>
        <TouchableOpacity style={styles.btLogin3}
                  title="Add point data"
                  onPress={() => navigation.navigate('Sample point data', {  latitude: currentLatitude, longitude:  currentLongitude,
                  samplerID : currentSamplerID, project: currentProject, projectYear: (Number(resamplingYear) > Number(currentProjectYear)+1)? resamplingYear : JSON.stringify(Number(currentProjectYear)+1), farmName: currentFarmName, fieldName: currentFieldName,fieldManagementType:  ''})}>
                  <Text style={styles.buttonText1}>Resample</Text>
                </TouchableOpacity>
                </View> 


        
        <TouchableOpacity style={styles.btLogin11} onPress={deletePoint}>
        <Text style={styles.buttonText1}>Delete sampling point</Text>
      </TouchableOpacity>
         
      </View> 
 }       
          

<TouchableOpacity style={styles.btLogin1} onPress={showData}>
   {(documentExists)?   <Text style={styles.buttonText1}>Refresh saved point data</Text>  : <Text style={styles.buttonText1}>Show saved point data</Text>} 
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
      marginTop: 6,
      marginBottom: 6,
      width: "67%",
      alignItems: "center",
    },
    btLogin3: {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginTop: 6,
      marginBottom: 6,
      width: "40%",
      alignItems: "center",
    },
    btLogin11: {
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
      color: "#A93226",
      fontWeight: "bold",
      fontSize: 18,
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
    TextInput1: {
      fontSize: 16,
      height: 30,
      paddingLeft: 50,
      borderRadius: 5,
      borderColor: "#116038",
      borderWidth: 1,
      borderBottomWidth: 1,
      marginTop: 10,
      borderBottomColor: "#116038",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      width: "100%",
    },
    TextInput2: {
      fontSize: 16,
      height: 30,
      paddingLeft: 50,
      borderRadius: 5,
      borderColor: "#116038",
      borderWidth: 1,
      borderBottomWidth: 1,
      marginTop: 10,
      borderBottomColor: "#116038",
      backgroundColor: "#fff",
      marginHorizontal: 10,
      width: "100%",
      alignItems: "center"
    },
    
    checkboxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingLeft: 10,
      marginTop: 10,
      marginHorizontal: 10
    },
    buttonTextCheck: {
      fontSize: 15,
      color: "#116038",
      marginTop: 0,
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

    }
  });


  export default UpdatePoint;