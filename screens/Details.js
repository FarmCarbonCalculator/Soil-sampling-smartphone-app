import React, { useState, useEffect} from "react";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import SelectDropdown from 'react-native-select-dropdown'
// import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { collection, onSnapshot, where, query, getFirestore, getDocs, setDoc, doc, } from "firebase/firestore";



const DetailsScreen = ({ navigation }) => {


  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("USER IS STILL LOGGED IN: " , user);
      if (user) {
        setUser(user);
      }
    });
  }, [user]);


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in successfully:',  userCredential);
        setUser(userCredential);
      })
      .catch((error) => { 
      Alert.alert('Invalid username or password')
      console.log('Error', error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully:');
        setUser(null);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };


  const [projectNameSuggestions, setProjectNameSuggestions] = useState([{"title": "Agri Carbon Kernow"}, {"title": "Duchy of Cornwall"},  {"title": "FORG"}, {"title": "Farm Net Zero"}, {"title": "NCS"}]);
  const [farmNameSuggestions, setFarmNameSuggestions] = useState([]);
  const [project, setProject] = useState(null);
  const [farmName, setFarmName] = useState(null);
  const [fieldName, setFieldName] = useState(null);
  const [samplerID, setSamplerID] = useState("");
  const [projectYear, setProjectYear] = useState("1");
  const [fieldManagementType, setFieldManagementType] = useState("");




  const getProjectNames = () => {

    const firestore = getFirestore()
    const collectionRef = collection(firestore, 'Project')
    let q = query(collectionRef)
    
   onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        let items = [] 
        snapshot.forEach( document => {
            items =  [...items,document.data()];
            
        });
  
       
        setProjectNameSuggestions(items)

        console.log(projectNameSuggestions)
  
  })
  
  }






const getFarmNames = () => {

const firestore = getFirestore()
const collectionRef = collection(firestore, "Project/"+project+"/FarmNames")
let q = query(collectionRef)

onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    let items = [] 
    snapshot.forEach( document => {
        items =  [...items,document.data()];
        
    });

    setFarmNameSuggestions(items)
    console.log(farmNameSuggestions)

})

}


// const getFieldNames = () => {

// const firestore = getFirestore()
//  const collectionRef = collection(firestore, "Project/"+project+"/FarmNames/"+farmName+"/FieldNames")
// let q = query(collectionRef)

// onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
//     let items = [] 
//     snapshot.forEach( document => {
//         items =  [...items,document.data()];
        
//      });

//     setFieldNameSuggestions(items)
//     console.log(fieldNameSuggestions)

// })

// }




const goToMap = () => {

const firestore = getFirestore();

{fieldManagementType != "" && setDoc(doc(firestore,"fieldList", `${projectYear}_${farmName}_${fieldName}`), {
  samplerID: samplerID,
  project: project,
  projectYear: projectYear,
  farmName: farmName,
  fieldName: fieldName,
  fieldManagementType: fieldManagementType })

}
  navigation.navigate("Sample point location",
    {samplerID : samplerID, project : (project != null)? project : "", projectYear: projectYear, fieldManagementType:  fieldManagementType, farmName: (farmName != null)? farmName : "", fieldName: (fieldName != null)? fieldName : ""})

}


const goToBackup = () => {
    navigation.navigate("Upload backup")
  }

  if (!user) {
    return (
      <View style={[styles.container]}>
        <TextInput style={styles.TextInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput style={styles.TextInput}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.btLogin1}  onPress={handleLogin}><Text adjustsFontSizeToFit={true}
numberOfLines={1}
style={styles.buttonText1}>Log in</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (user) {
    return (

      <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#ffffff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}> 
        <View style = {styles.container}>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sampler ID</Text>
          <TextInput style={styles.TextInput} onChangeText={newText => setSamplerID(newText)}
          defaultValue="" placeholder="Name or ID"
            />
        </View> 


  




<View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project name </Text>
          <View style = { {fontSize: 16,
      flexShrink: 1, paddingLeft: 10, width : "1000%"}}>
            <SelectDropdown
    data={projectNameSuggestions}
    onSelect={item => {item &&  setProject(item.title.replace(/\s{2,}/g,' ').trim().toUpperCase())  
    }}
    renderButton={() => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text >
            {project}
          </Text>
        </View>
      );
    }}
    renderItem={(item, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected)}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title.replace(/\s{2,}/g,' ').trim().toUpperCase()}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
    search
    searchInputStyle={styles.dropdownSearchInputStyle}
    searchInputTxtColor={'#151E26'}
    searchPlaceHolder={project}
    searchPlaceHolderColor={'#72808D'}
    onChangeSearchInputText = {newText => setProject(newText.replace(/\s{2,}/g,' ').trim().toUpperCase())}   
    onFocus={getProjectNames}
  />
</View>
 </View>


        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Project year</Text>
          <TextInput style={  {    height : 30,
      paddingLeft : 10,
      borderRadius : 5,
      borderColor : "#116038",
      borderWidth : 1,
      borderBottomWidth : 1,
      marginTop : 10,
      borderBottomColor : "#116038",
      backgroundColor : "#fff",
      marginHorizontal : 10,
      width : "30%"}} onChangeText={newText => setProjectYear(newText.trim().replace(/[^0-9]/g, ''))}
          defaultValue = "" placeholder="Year 1/2/3..." keyboardType="numeric"
            />
        </View> 

       

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Farm name </Text>
          <View style = { {fontSize: 16,
      flexShrink: 1, paddingLeft: 10, width : "1000%"}}>
            <SelectDropdown
    data={farmNameSuggestions}
    onSelect={item => {item &&  setFarmName(item.title.replace(/\s{2,}/g,' ').trim().toUpperCase())  
    }}
    renderButton={() => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text >
            {farmName}
          </Text>
        </View>
      );
    }}
    renderItem={(item, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected)}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title.replace(/\s{2,}/g,' ').trim().toUpperCase()}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
    search
    searchInputStyle={styles.dropdownSearchInputStyle}
    searchInputTxtColor={'#151E26'}
    searchPlaceHolder={farmName}
    searchPlaceHolderColor={'#72808D'}
    onChangeSearchInputText = {newText => setFarmName(newText.replace(/\s{2,}/g,' ').trim().toUpperCase())}   
    onFocus={getFarmNames}
  />
</View>
 </View>


         <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Field name</Text>
          <TextInput style={  {    height : 30,
      paddingLeft : 10,
      borderRadius : 5,
      borderColor : "#116038",
      borderWidth : 1,
      borderBottomWidth : 1,
      marginTop : 10,
      borderBottomColor : "#116038",
      backgroundColor : "#fff",
      marginHorizontal : 10,
      width : "50%"}} onChangeText={newText => setFieldName(newText.replace(/\s{2,}/g,' ').trim().toUpperCase())}
          defaultValue = "" placeholder="Field name"
            />
        </View> 


        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Management</Text>
          <TextInput multiline={true} style={  {    height : 60,
      paddingLeft : 10,
      borderRadius : 5,
      borderColor : "#116038",
      borderWidth : 1,
      borderBottomWidth : 1,
      marginTop : 10,
      borderBottomColor : "#116038",
      backgroundColor : "#fff",
      marginHorizontal : 10,
      width : "70%"}} onChangeText={newText => setFieldManagementType(newText)}
          defaultValue = "" placeholder="Management type"
            />
        </View> 




        <TouchableOpacity style={styles.btLogin1}  onPress={goToMap}>
          <Text adjustsFontSizeToFit={true}
numberOfLines={1}
style={styles.buttonText1}>Go to map</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btLogin1}  onPress={goToBackup}>
          <Text adjustsFontSizeToFit={true}
numberOfLines={1}
style={styles.buttonText1}>Upload backup data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btLogout}  onPress={handleLogout}><Text adjustsFontSizeToFit={true}
numberOfLines={1}
style={styles.buttonText1}>Log out</Text>
        </TouchableOpacity>

        </View>
        </KeyboardAwareScrollView>
      
    );
  };


  
};

  
  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      fontSize: 16,
      flexShrink: 1, 
      paddingLeft: 10, 
      paddingTop:2,
      width : "100%",
      height: 30,
      borderRadius: 5,
      borderColor: "#116038",
      borderWidth: 1,
      marginTop: 10,
      backgroundColor: "#fff",
      marginHorizontal: 10,
  },
  dropdownSearchInputStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom: 0,
      paddingTop: '15%',
      backgroundColor: "#fff",
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    camera: {
      marginTop: '5%',
      marginBottom: 10,
      aspectRatio: 0.868,
      flex: 0.8,
      borderWidth: 1.5,
      borderColor: "#116038",
      width: '95%',
    height: '60%',
    },
    buttonContainer: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      width : "80%",
      marginTop: '5%'
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
    btLogin2: {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 20,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginBottom: 12,
      width: "70%",
      alignItems: "center",
    marginTop : '15%'},
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
      width: "70%",
      alignItems: "center",
    },
    btLogout: {
      borderWidth: 1.5,
      borderColor: "#116038",
      height: 40,
      marginHorizontal: 30,
      backgroundColor: "#116038",
      padding: 7,
      borderRadius: 5,
      marginTop: "10%",
      marginBottom: 12,
      width: "50%",
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
      width: "70%",
    },
    callout: {
      backgroundColor: 'white',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    }
  });

  export default DetailsScreen;