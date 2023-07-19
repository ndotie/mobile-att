import {useState,useContext} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../store/authContext';
export const SettingScreen = props => {
    const { logout } = useContext( AuthContext );
    //getting user from here...
    return <View style = {{flex : 1,  alignItems : 'center'}}>
        <Text style = {{}}>User Settings</Text>
        <TouchableOpacity onPress = {() => logout()}><Text>Logout</Text></TouchableOpacity>
    </View>
}