
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../components/dashboard'; 
import { IntroPage } from '../components/intropage';
const Stack = createStackNavigator();

export const DashNav = () => {
    return <Stack.Navigator>  
            <Stack.Screen name="Attendance" component={IntroPage} />
            <Stack.Screen name="Barcode" component={DashboardScreen} />
     </Stack.Navigator>
}