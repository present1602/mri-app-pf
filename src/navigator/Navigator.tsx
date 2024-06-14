import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Splash from '../screens/Splash/Splash';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import TempScreens from '../screens/test/TempScreens'
import OCRNavigator from './OCRNavigator';
// import Cropper from '../screens/OCR/Cropper';

type RootNavigatorParamsList = {
  Splash: undefined,
  TabScreens: undefined,  //React.FC  
  AuthScreens: undefined,
  Cropper: undefined,
  TempScreens: undefined,
  Question : undefined,
  OCRScreens: undefined,
}
const RootStack = createStackNavigator<RootNavigatorParamsList>()

const Navigator =   () => {
  return (
    <RootStack.Navigator headerMode="none">
      {/* <RootStack.Screen name="TempScreens" component={TempScreens}/>  */}
      <RootStack.Screen name="Splash" component={Splash}/>
      <RootStack.Screen name="TabScreens" component={TabNavigator}/>
      <RootStack.Screen name="AuthScreens" component={AuthNavigator}/>
      <RootStack.Screen name="OCRScreens" component={OCRNavigator}/>
    </RootStack.Navigator>
  );
}

export default Navigator;