import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingScreen } from '../components/settings';
import { DashNav } from './dashNav';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export  function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Scanner') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'RecipeList') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings-outline' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="Scanner" component={DashNav} options={{
            headerShown: false,
          }} />
          
          <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
  }