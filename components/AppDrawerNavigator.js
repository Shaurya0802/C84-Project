import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingsScreen';
import MyDonationsScreen from '../screens/MyDonationsScreen';

export const AppDrawerNavigator =  createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyDonations: {
        screen: MyDonationsScreen
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