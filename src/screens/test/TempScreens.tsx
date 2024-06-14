import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraTest from './CameraTest';
import Login from '../../screens/Auth/Login';
import CameraTest2 from './CameraTest2';
import CameraTest3 from './CameraTest3';
import CameraTest4 from './CameraTest4';
import CameraTest5 from './CameraTest5';
import CameraTest6 from './CameraTest6';
import CameraTest22 from './CameraTest22';
import SearchUITest from './SearchUITest';
import SlectBoxTest from './sb/SlectBoxTest';
// import RadioBoxTest from './RadioBoxTest';
import OCRTest from './OCRTest'
import PermissionTest1 from './PermissionTest1'
import SendImageTest from './SendImageTest'
import NaverTest from './NaverTest'
import Kakao3Test from './Kakao3Test'
import TextTest from './TextTest'
import PositionTest from './PositionTest'
import ArticleLoadTest from './ArticleLoadTest'

type TempScreensParamsList = {
  CameraTest: undefined
  CameraTest2: undefined,     // image crop     amazing-cropper
  CameraTest3: undefined      // open camera   from react-native-image-picker
  CameraTest4: undefined      // oepn camera    from react-native-image-crop-picker
  CameraTest5: undefined      // oepn camera    from react-native-camera
  CameraTest6: undefined      // oepn camera    from react-native-camera
  CameraTest22: undefined      // oepn camera   amazing-cropper with img taken url as route param
  SearchUITest: undefined      // oepn camera   amazing-cropper with img taken url as route param
  OCRTest: undefined
  PermissionTest1: undefined,
  Login: undefined,
  SlectBoxTest: undefined
  SendImageTest: undefined
  NaverTest: undefined
  Kakao3Test: undefined
  ArticleLoadTest: undefined,
  TextTest:undefined,
  PositionTest: undefined
}

const Stack = createStackNavigator<TempScreensParamsList>()

const TempScreens = () => {
  
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="CameraTest4" component={CameraTest4} />
      <Stack.Screen name="PositionTest" component={PositionTest} />
      <Stack.Screen name="CameraTest2" component={CameraTest2} />
      <Stack.Screen name="TextTest" component={TextTest} />
      <Stack.Screen name="SlectBoxTest" component={SlectBoxTest} />
      <Stack.Screen name="ArticleLoadTest" component={ArticleLoadTest} />
      {/* <Stack.Screen name="Kakao3Test" component={Kakao3Test} /> */}
      <Stack.Screen name="NaverTest" component={NaverTest} />
      <Stack.Screen name="SendImageTest" component={SendImageTest} />
      <Stack.Screen name="PermissionTest1" component={PermissionTest1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OCRTest" component={OCRTest} />
      <Stack.Screen name="SearchUITest" component={SearchUITest} />
      <Stack.Screen name="CameraTest6" component={CameraTest6} />
      <Stack.Screen name="CameraTest5" component={CameraTest5} />
      <Stack.Screen name="CameraTest22" component={CameraTest22} />
    </Stack.Navigator>
  );
}

export default TempScreens;