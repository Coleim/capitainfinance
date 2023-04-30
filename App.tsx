import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { HomePage } from './app/pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecurringConfigurationPage } from './app/pages/RecurringConfigurationPage';
import { EditRecurringTransactionItemPage } from './app/pages/EditRecurringTransactionItemPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { EditTransactionItemPage } from './app/pages/EditTransactionItemPage';
import { database } from './app/services/DbServices';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/states/store';
import { styles } from './styles';


const Loading = () => {
  return (
    <SafeAreaView style={[styles.content]}>
      <View style={{ flex: 1, justifyContent: "center"}}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
}

const App = () => {
  // const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  let [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    setCanProceed(true);

    // setCanProceed(false);
    // database.CreateDatabase().then( _ => {
    //   console.log("Database created");
    //   database.GetRecurringAmountPerCategory().then( _ => {
    //     console.log("GetRecurringAmountPerCategory");
    //     database.GetAmountPerCategory().then( _ => {
    //       console.log("GetAmountPerCategory");
    //       setCanProceed(true);
    //     })
    //     setCanProceed(true);
    //   })

      
    // })
  }, []);
  
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
        
        <SafeAreaProvider>
          <StatusBar style="auto"/>
          { canProceed ?
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomePage" component={HomePage}/>
                <Stack.Screen name="RecurringConfigurationPage" component={RecurringConfigurationPage} />
                <Stack.Screen name="EditRecurringTransactionItemPage" component={EditRecurringTransactionItemPage} />
                <Stack.Screen name="EditTransactionItemPage" component={EditTransactionItemPage} />
              </Stack.Navigator>
            </NavigationContainer>
            :
            <Loading/>
          }
        </SafeAreaProvider>
        
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;


