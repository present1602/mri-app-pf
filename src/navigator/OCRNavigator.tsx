import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OCREntry from '../screens/Entry/Entry'
import Cropper from '../screens/OCR/Cropper'
import OCRInProgress from '../screens/OCR/OCRInProgress';
import OCRFail from '../screens/OCR/OCRFail';

type OCRNavigatorParamsList = {
  // OCREntry: undefined,
  Cropper: undefined,
  OCRInProgress: undefined
  OCRFail: undefined
}

const OCRStack = createStackNavigator<OCRNavigatorParamsList>()

const OCRNavigator = () => {
  
  return (
    <OCRStack.Navigator headerMode="none">
      <OCRStack.Screen name="Cropper" component={Cropper} />
      <OCRStack.Screen name="OCRInProgress" component={OCRInProgress}/>
      <OCRStack.Screen name="OCRFail" component={OCRFail}/>
    </OCRStack.Navigator>
  );
}

export default OCRNavigator;