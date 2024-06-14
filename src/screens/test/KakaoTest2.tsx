import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { login as KakaoLogin, KakaoProfile, getProfile as getKakaoProfile, } from "@react-native-seoul/kakao-login";

const KakaoTest = () => {
  const [result, setResult] = useState('i rest')
  const [result2, setResult2] = useState('result2') 

  const openKakaoLogin = async () => {
    const token: any = await KakaoLogin();
    // setResult(JSON.stringify(token))
    console.log(token)
    setResult(JSON.stringify(token));

    if( token ){
      const profile: KakaoProfile = await getKakaoProfile();
      setResult2(JSON.stringify(profile));
    }
  }
  const getProf = async () => {
    const profile: KakaoProfile = await getKakaoProfile();
    console.log(JSON.stringify(profile));
    setResult2(JSON.stringify(profile));
  }
  // const openKakaoLogin = () => {
  //   KakaoLogin().then(token => {
  //     setResult(JSON.stringify(token))
  //   }).then(res =>{
  //   }
  // }

 return (
   <View style={{ backgroundColor:'#fff', flex:1}}>
     <TouchableOpacity onPress = { () => openKakaoLogin() } >
        <Text style={{fontSize:20, padding:20}}>asd</Text>
     </TouchableOpacity>

     <TouchableOpacity onPress = { () => getProf() } >
        <View>
          <Text style={{fontSize:20, padding:20}}>asd222</Text>
        </View>
     </TouchableOpacity>

     <View style={{padding:30}}>
       <Text>{result}</Text>
     </View>

     <View style={{padding:30}}>
       <Text>{result2}</Text>
     </View>
   </View>
 );
};

export default KakaoTest