import {useEffect, useState} from 'react';
import { Text, View,TouchableOpacity,Linking, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BASE_URL, getUser } from '../commons';
import axios from 'axios';
export const DashboardScreen = props => {
    const [ hasPermission, setHasPermission ] = useState( null );
    const [ scanned, setScanned ] = useState( false );
    const [ text, setText ] = useState("Not yet scanned");

 
     
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
             
            setHasPermission( status === 'granted' );

        })();
    },[]);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned( true );
        //TODO Here is where we choose to redirect or what
        // alert( "Scanned Successfully" );
        alert( data );
        let user = await getUser();
        try{

         
        let results = await axios.post(`${BASE_URL}attend`, {
            lession_id : 2,
            code : data
        },{
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        })
        console.log( results );
    }catch( ex ) {
        console.log( ex )
    }
        //sending this data to backend for check up
        // alert( `Bar Code With Type ${type} and data ${Linking.openURL(`${JSON.stringify(data)}`)} has been scanned`)
    }

   

    if( hasPermission === null ) {
        return <View>
            <Text>Requesting for camera permission</Text>
            {/* <TouchableOpacity onPress = {() => askForCameraPermission()}><Text>Open camera</Text></TouchableOpacity> */}

        </View>
    }

    if( hasPermission === false ) {
        return <View>
            <Text>No access to camera</Text>
        </View>
    }
    
   
    return <View style = {styles.container}>
       <BarCodeScanner
           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
           style = {StyleSheet.absoluteFillObject}
           />
           {scanned && <Button title = {"Tap to scan Again"} onPress = {() => setScanned( false )}></Button> }
           </View>
}

 

const styles = StyleSheet.create({
   container : {
      flex : 1,
      flexDirection : 'column',
      justifyContent : 'center'
   }
})

 