import {useState} from 'react'
import { View, Text, TextInput,ActivityIndicator,
    KeyboardAvoidingView,
    Platform,  
    ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { APP_NAME, BASE_URL } from '../commons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Logo } from '../components/Logo';
export const RegistrationScreen = props => { 
    const { navigation } = props;
    const [ firstname, setFirstName ] = useState('');
    const [ lastname, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState();//Initially undefined for the conditional check purposes

    const tryRegister = async () => {
        setIsLoading( true );
        setError();//clear that error
        try{
            let res = await axios.post(`${BASE_URL}/registration`, {
                firstName:firstname,lastName:lastname,email,password
            })
            console.log(" registreed")
            navigation.push("Login")
        }catch( e ) {
            setError("An error have occured");
        }finally {
            setIsLoading( false );
        }
    }


    return <View style = {{ 
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center'
        // marginTop : 190
    }}>
         <Logo />
        <Text style={{color : 'orange',fontSize : 30, fontWeight : 'bold' }}>{APP_NAME}</Text>
        <View style = {{ width : '90%', }}>
        {/* <KeyboardAvoidingView
            style= {{flex : 1}}>  */}
            
        <View style = {styles}>
        
                <TextInput placeholder='First name' 
                           value = {firstname} 
                           onChangeText = {text => setFirstName(text)}/>
            </View>
            <View style = {{...styles,marginTop : 5}}> 
                <TextInput placeholder='LastName'
                           value = {lastname}
                           onChangeText = { text => setLastName( text ) }/>
            </View>
            <View style = {{...styles,marginTop : 5}}>
            <Entypo name="email" size={24} color="black" />
                <TextInput placeholder='Email'
                           value = {email}
                           onChangeText = {text => setEmail(text)}/>
            </View>
            <View style = {{...styles,marginTop : 5}}>
            <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />
                <TextInput secureTextEntry={true} 
                           placeholder='Password'
                           value = {password}
                           onChangeText = {text => setPassword(text)}/>
            </View>
            <TouchableOpacity onPress = {async () => await tryRegister() } 
                              style = {{width : '100%', 
                                        paddingVertical : 10, 
                                        marginTop : 20,
                                        flexDirection :"row", 
                                        backgroundColor:'green',
                                        borderRadius: 5,
                                        justifyContent : "center"}}>
                 {isLoading ? <ActivityIndicator size="small" color = "#0000ff" /> :<Text style = {{color : '#fff'}}>Register</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => {
                navigation.push("Login")
               }}>
                <Text style = {{textAlign : 'center'}}>Have an Account, <Text style = {{fontWeight : 'bold'}}>Login now</Text></Text>
            </TouchableOpacity>
           

            {/* </KeyboardAvoidingView> */}
        </View> 
    </View>
}

const styles = {
    width : '100%', 
    alignItems : 'center',
    backgroundColor : 'orange',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal : 10,
    paddingVertical : 10
}