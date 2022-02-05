import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import LocationScreen from '../screens/LocationScreen';
import DataScreen from '../screens/DataScreen';
import APIScreen from '../screens/APIScreen';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="DataScreen"
        component={DataScreen}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="APIScreen"
        component={APIScreen}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <BottomTabBar />
    </NavigationContainer>
  );
};

export default Navigator;
