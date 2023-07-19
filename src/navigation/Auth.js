import { useContext } from 'react';
import { AuthContext } from '../store/authContext';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../authentication/LoginScreen';
import { RegistrationScreen } from '../authentication/Registration'; 
import { TabNavigator } from './innerTabNav';
const Stack = createStackNavigator();

export const AuthStackNav = () => {
    const { user } = useContext( AuthContext ); 
    return <Stack.Navigator>
      {user ? <Stack.Screen name="Authorized" component={TabNavigator}  options={{
            headerShown: false,
          }} /> : 
    <>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegistrationScreen} /> 
    </>
    } 

  </Stack.Navigator>
}