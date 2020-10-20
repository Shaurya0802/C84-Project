import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingsScreen';
import MyBartersScreen from '../screens/MyBartersScreen';

export const AppDrawerNavigator =  createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyBarters: {
        screen: MyBartersScreen
    },
    Setting: {
        screen: SettingScreen
    }
    },

    {contentComponent: CustomSidebarMenu},
    
    {
        initialRouteName: 'Home'
    }
);