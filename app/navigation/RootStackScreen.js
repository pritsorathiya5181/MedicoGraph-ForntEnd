import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import FirstScreen from '../screens/onBoarding/FirstScreen';
import SecondScreen from '../screens/onBoarding/SecondScreen';
import HomeScreen from '../screens/HomeScreen';
import AddRecords from '../screens/newRecords/AddRecords';
import BottomTab from './BottomTab';
import AddFamily from '../screens/Family/AddFamily';
import FamilyHome from '../screens/Family/FamilyHome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomStack() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="family" component={FamilyHome} />
    </Tab.Navigator>
  );
}

const RootStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Splash'}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="First" component={FirstScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
      <Stack.Screen name="Home" component={BottomStack} />
      <Stack.Screen name="addRecords" component={AddRecords} />
      <Stack.Screen name="addFamily" component={AddFamily} />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
