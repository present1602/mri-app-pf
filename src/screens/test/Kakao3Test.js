import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Kakao3Test = () => {
  const [res, setRes] = useState();

  const openKakao = async () => {
    console.log('   kakaoLogin   ');
    KakaoLogins.login([KAKAO_AUTH_TYPES[Account]], (result) => {
        if (err) {
            Alert.alert('kakao Login err', err)
            console.log(err);
            return;
        }
        // var access_token = result.slice(8, -1)
        Alert.alert('kakao Login run')
        Alert.alert('kakao Login result', result)
    });
  }  

  return (
    <View>
      <TouchableOpacity onPress = { () => openKakao() }>
        <Text style={{ padding:10, fontSize: 22}}>aaa</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 50}}> 
        <Text>result : {res}</Text>
      </View>
    </View>
  );
}

export default Kakao3Test;