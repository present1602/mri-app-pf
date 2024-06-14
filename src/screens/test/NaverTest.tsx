import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Platform,
  View, Text
} from "react-native";
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";

const iosKeys = {
  kConsumerKey: "naver client id",
  kConsumerSecret: "naver secret id",
  kServiceAppName: "테스트앱(iOS)",
  kServiceAppUrlScheme: "testapp" // only for iOS
};

// client id : g9weCsA9ZStYMia77mlV
// secret : VI0Kf8HU9y

const androidKeys = {
  kConsumerKey: "g9weCsA9ZStYMia77mlV",
  kConsumerSecret: "VI0Kf8HU9y",
  kServiceAppName: "MRI"
};

const initials = Platform.OS === "ios" ? iosKeys : androidKeys;

const App = () => {
  const [naverToken, setNaverToken] = React.useState<any>("ac tk");
  const [refreshToken, setRefreshToken] = React.useState<any>("ref tk");
  const [email, setEmail] = React.useState<any>('initial email');
  const [snsUserKey, setSnsUserKey] = React.useState<any>('initiau user key');

  const getUser = async () => {
    // Alert.alert("getUser by accesstoken : ", naverToken)
    const profileResult = await getProfile(naverToken);
    console.log("check profileResult : ", profileResult);

    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    }else{
      setEmail(profileResult.response.email)
      setSnsUserKey(profileResult.response.id)
    }
    // console.log("profileResult", profileResult);
  }

  // AAAAO+ZrmZtF5dTMSh2QoDoHp1yaVQrdprnNdDQwJJ8swteKcxX0/bLxROqMk9pimhwVpN1aB+wbuLuDpYr/gzj21PI=
  const naverLogin = (props:any)=> {
    // return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        // console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        console.log("Token : " + JSON.stringify(token));
        console.log("accessToken : " + token?.accessToken);
        setNaverToken(token?.accessToken);
        setRefreshToken(token?.refreshToken);
        // if (err) {
        //   reject(err);
        //   return;
        // }
        // resolve(token);
      });
    // });
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken("");
  };

  const getUserProfile = async () => {
    console.log("call getuserprofile naverToken : ", naverToken)
    const profileResult = await getProfile("kad");
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    }
    console.log("profileResult", profileResult);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="네이버 아이디로 로그인하기"
        onPress={() => naverLogin(initials)}
      />
      <Button
        title="등록된 아이디로 이메일, 유저키 get"
        onPress={() => getUser()}
      />

      {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}

      {!!naverToken && (
        <Button title="회원정보 가져오기" onPress={getUserProfile} />
      )}
      <View>
        <Text>토큰 : {naverToken}</Text>
        <Text>리프레시 토큰 : {refreshToken}</Text>
        <Text>이메일 : {email}</Text>
        <Text>이메일 : {snsUserKey}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

export default App;

// import React from 'react';
// import { View, Text } from 'react-native';


// const NaverTest = () => {
//   return (
//     <View>
//       <Text>naver 로그인</Text>
//     </View>
//   );
// }

// export default NaverTest;