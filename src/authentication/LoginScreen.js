import {useState,useContext} from 'react'
import { View, Text, TextInput,ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { APP_NAME, BASE_URL } from '../commons';
import { AuthContext } from '../store/authContext';
import { Logo } from '../components/Logo';
export const LoginScreen = props => { 
    const [ isLoading, setIsLoading ] =  useState(false);
    const [ username, setUserName ] =  useState('');
    const [ password, setPassword ] =  useState('');
    const [ error, setError ] =  useState();
    const {user,setUser} = useContext(AuthContext);//picking start from global auth state manager
    const [ secure, setSecure ] = useState( true );
    const { navigation } = props;
    const tryLogin = async () => {
        setIsLoading(true);
        setError()
        try{
            console.log( "This get called" );
            let res = await axios.post(`${BASE_URL}auth/login`, {email: username,password})
            console.log( res.data );
            if( res.data ){
                console.log("Worked fine here")
                setUser( res.data );
            }
        }catch( e ) {
            console.log( e );
            console.log( e.message );
            if( e.message && e.message === "Network Error"){
                setError("Network error, check your connection")
            }else{  
                setError("Username or password is invalid")
            }
        }finally{
            setIsLoading(false);
        }
    }
    return <View style = {{ 
        flex : 1, 
        alignItems : 'center',
        marginTop : 100
    }}>
        <Logo />
        <Text style={{color : 'orange',fontSize : 30, fontWeight : 'bold' }}>{APP_NAME}</Text>
        <View style = {{ width : '90%', flex : 4}}>
            <View style = {styles}>
            {/* <Entypo name="email" size={24} color="black" /> */}
                <TextInput placeholder='Email' 
                           onChangeText={text => setUserName( text )}
                           value = {username}/>
            </View>
            <View style = {{...styles,marginTop : 5}}>
            {/* <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" /> */}
                <TextInput placeholder='Password'
                           secureTextEntry={secure} 
                           onChangeText={text => setPassword( text )}
                           value = {password}/>
                           <TouchableOpacity onPress={() => setSecure(!secure)}>
                     {secure ? <Feather name="eye" size={24} color="black" /> : <Feather name="eye-off" size={24} color="black" />}
                
                </TouchableOpacity>
            </View>
            {error ? <Text style = {{color : 'red',textAlign : 'center'}}>{error}</Text> : null}
            <TouchableOpacity 
            
            onPress = {() => {
                // navigation.push("RecipeList")
                tryLogin()
            }} 
                              style = {{width : '100%', 
                                        paddingVertical : 10, 
                                        marginTop : 20,
                                        flexDirection :"row", 
                                        backgroundColor:'green',
                                        borderRadius: 5,
                                        justifyContent : "center"}}>
                 {isLoading ? <ActivityIndicator size="small" color="#0000ff"/> : <Text style = {{color : '#fff'}}>Login</Text>}
            </TouchableOpacity>

            {/* <TouchableOpacity onPress = {() => {
                navigation.push("Register")
            }}>
                <Text style = {{textAlign : 'center'}}>Have no Account, <Text style = {{fontWeight : 'bold'}}>Register now</Text></Text>
            </TouchableOpacity> */}
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
    paddingVertical : 10,
    justifyContent : 'space-between'
}