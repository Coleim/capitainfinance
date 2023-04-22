import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { HomePage } from './app/pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecurringConfigurationPage } from './app/pages/RecurringConfigurationPage';
import { EditRecurringTransactionItemPage } from './app/pages/EditRecurringTransactionItemPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from "react-native";
import { EditTransactionItemPage } from './app/pages/EditTransactionItemPage';

const App = () => {
  // const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  
  return (
    <SafeAreaProvider>
      <StatusBar style="auto"/>
      {/* <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="HomePage" component={HomePage} options={ { title: "BITE" }}/>
          <Drawer.Screen name="RecurringConfigurationPage" component={RecurringConfigurationPage} options={ { title: "Transactions régulières" }} />
          <Drawer.Screen name="EditRecurringTransactionItemPage" component={EditRecurringTransactionItemPage} />
        </Drawer.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomePage" component={HomePage} options={ { title: "BITE" }}/>
          <Stack.Screen name="RecurringConfigurationPage" component={RecurringConfigurationPage} options={ { title: "Transactions régulières" }} />
          <Stack.Screen name="EditRecurringTransactionItemPage" component={EditRecurringTransactionItemPage} />
          <Stack.Screen name="EditTransactionItemPage" component={EditTransactionItemPage} />
        </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;


