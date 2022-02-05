import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import LocationScreen from '../screens/LocationScreen';
import DataScreen from '../screens/DataScreen';
import APIScreen from '../screens/APIScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: '#00ffb3',
        tabBarIconStyle: {marginTop: 6},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerTitle: 'Camera',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          headerTitle: 'Location',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DataScreen"
        component={DataScreen}
        options={{
          headerTitle: 'Local Data',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="hdd-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="APIScreen"
        component={APIScreen}
        options={{
          headerTitle: 'API',
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="exchange" color={color} size={size} />
          ),
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
