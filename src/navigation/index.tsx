import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from '../../types';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/Home/HomeScreen';
//import VesselScreen from '../screens/VesselDetails/VesselScreen';
import ExpensesScreen from '../screens/Expenses/ExpensesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AllExpensesScreen from '../screens/Expenses/AllExpensesScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllExpensesScreen"
        component={AllExpensesScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        tabBarItemStyle: {
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarStyle: {
          height: 65,
        },
      }}>
      <BottomTab.Screen
        name="homeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? Colors.primary : Colors.primaryOpacity3}
              size={23}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="expensesTab"
        component={ExpensesScreen}
        options={{
          title: 'Expenses',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="pie-chart"
              color={focused ? Colors.primary : Colors.primaryOpacity3}
              size={23}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="profileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => (
            <AntDesignIcon
              name="idcard"
              color={focused ? Colors.primary : Colors.primaryOpacity3}
              size={23}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="settingsTab"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="settings-outline"
              color={focused ? Colors.primary : Colors.primaryOpacity3}
              size={23}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
