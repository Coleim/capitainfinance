import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { HomePage } from './app/pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecurringConfigurationPage } from './app/pages/RecurringConfigurationPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import { EditTransactionItemPage } from './app/pages/EditTransactionItemPage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/states/store';
import { styles } from './styles';
import { StatisticsPage } from './app/pages/StatisticsPage';


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
                <Stack.Screen name="StatisticsPage" component={StatisticsPage} />
                <Stack.Screen name="RecurringConfigurationPage" component={RecurringConfigurationPage} />
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


