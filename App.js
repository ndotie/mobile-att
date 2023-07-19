import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNav } from './src/navigation/Auth';
import { AuthContextProvider } from './src/store/authContext';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();
console.disableYellowBox = true;
export default function App() {
  return (
    <AuthContextProvider>
    <NavigationContainer>
     
       
      <StatusBar style="auto" />
      <AuthStackNav />
    
    </NavigationContainer>
    </AuthContextProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
