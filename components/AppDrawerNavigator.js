import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSidebarMenu from './CustomSidebarMenu';
import SettingScreen from '../screens/SettingsScreen';
import MyBartersScreen from '../screens/MyBartersScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

export const AppDrawerNavigator =  createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyBarters: {
        screen: MyBartersScreen
    },
    Notifications: {
        screen: NotificationsScreen
    },
    Setting: {
        screen: SettingScreen
    }
},{contentComponent: CustomSidebarMenu},{initialRouteName: 'Home'});