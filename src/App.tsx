/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigator/Navigator';
import { AppProvider } from "./provider/RootProvider";
import { QuestionProvider } from "./provider/QuestionProvider"
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  
  return (
    <AppProvider>
      <QuestionProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </QuestionProvider>
    </AppProvider>
  );
};



//  const App = () => {
//     const [result, setResult] = useState('i rest')

//     const openKakaoLogin = async () => {
//       const token: any = await KakaoLogin();
//       // setResult(JSON.stringify(token))
//       console.log(token)
//       setResult(JSON.stringify(token));
//     }
//    return (
//      <View style={{ backgroundColor:'#fff', flex:1}}>
//        <TouchableOpacity onPress = { () => openKakaoLogin() } >
//           <Text style={{fontSize:20, padding:20}}>asd</Text>
          
//        </TouchableOpacity>
//        <View style={{padding:30}}>
//          <Text>{result}</Text>
//        </View>
//      </View>
//    );
//  };


 export default App;
