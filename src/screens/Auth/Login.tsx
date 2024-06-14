import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Platform, Alert } from 'react-native';
import { login as KakaoLogin, getProfile as getKakaoProfile } from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-community/async-storage';
import { sns_login } from '../../api/user'
import {useAppContext} from '../../provider/RootProvider'
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import { NaverLoginAndroindKeys, NaverLoginIOSKeys} from '../../config/sns_config'
import {
  appleAuth, AppleButton
} from '@invertase/react-native-apple-authentication'
import jwtDecode from 'jwt-decode'


const naverLoginConfig = Platform.OS === "ios" ? NaverLoginIOSKeys : NaverLoginAndroindKeys;

interface tokenType {
  aud: string,
  auth_time: number,
  c_hash: string,
  email: string,
  email_verified: string,
  exp: number,
  iat: number,
  is_private_email: string,
  iss: string,
  nonce: string,
  nonce_supported: boolean,
  sub: string
}


const Login = () => {
  const navigation = useNavigation();
  const {state, setUser} = useAppContext();


  const onAppleButtonPress = async (platform:string) => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log("apple credentialState : ", credentialState)
      const { identityToken, user } = appleAuthRequestResponse;
      const decodedToken: tokenType = jwtDecode(identityToken!);
      console.log('email_from_decodedToken', decodedToken.email);
      // console.log('email', email);
      console.log('user', user);
                    
      const params = {
        access_token: '',
        sns_type: "30",   // "10": 카카오, "20": 네이버
        sns_user_key: user,
        email: decodedToken.email,
        auto_login: false,
        setUser: setUser
      }
      console.log("getnaveruserprofile before params : ", params);
      sns_login(params, navigation);
    }else{
      console.log("apple credeitnal fail")
    }
  }

  const getNaverUserProfile = async (naverToken:string) => {
    const profileResult = await getProfile(naverToken);
    if (profileResult.resultcode === "024") {
      Alert.alert("로그인 실패", profileResult.message);
      return;
    }
    // console.log("profileResult", profileResult);
    const params = {
      access_token: naverToken,
      sns_type: "20",   // "10": 카카오, "20": 네이버
      sns_user_key: profileResult.response.id,
      email: profileResult.response.email,
      auto_login: false,
      setUser: setUser
    }
    console.log("getnaveruserprofile before params : ", params);
    sns_login(params, navigation);

  };

  const openNaverLogin = async () => {
    NaverLogin.login(naverLoginConfig, (err, token) => {
      // console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
      console.log("Token : " + JSON.stringify(token));
      if(token){
        const accessToken:string = token?.accessToken
        getNaverUserProfile(accessToken)
      }

      // setNaverToken(token?.accessToken);
      // setRefreshToken(token?.refreshToken);
      // // if (err) {
      // //   reject(err);
      // //   return;
      // // }
      // // resolve(token);
    });

    // NaverLogin.login(props, (err, token) => {
    //   // console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
    //   console.log("Token : " + JSON.stringify(token));
    //   console.log("accessToken : " + token?.accessToken);
    //   setNaverToken(token?.accessToken);
    //   setRefreshToken(token?.refreshToken);
    //   if (err) {
    //     reject(err);
    //     return;
    //   }
    //   resolve(token);
    // });
  }

  const openKakaoLogin = async () => {
    // const {state, setUser} = useAppContext();
  
    const token: any = await KakaoLogin();
    
    if(token){
      console.log("token2 : ", token)
      
      const profile:any = await getKakaoProfile();
      console.log("profile2 : ", JSON.stringify(profile));
      
      if(profile){
        console.log("if prof state")
        const params = {
          access_token: token.accessToken,
          sns_type: "10",   // "10": 카카오, "20": 네이버
          sns_user_key: profile.id.toString(),
          email: profile.email,
          auto_login: false,
          setUser: setUser
        }
        console.log("before params : ", params);
  
        sns_login(params, navigation);
      }
    }
  }
  
  useEffect(() => {
    

  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}>
        <ImageBackground source = { require('../../assets/img/login_background.png') } 
          style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}
        >
          <Image source= { require('../../assets/img/logo_main.png') } style={{ alignSelf: 'center' }}/>
        </ImageBackground>
        {/* <Image source = { require('../../assets/img/login_background.png') } 
          style={{ borderWidth: 1, borderColor: 'red' }}
        /> */}
        {/* <Text>MRI 로그인</Text> */}

      </View>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: 3 }}>
          <View style={[styles.mainButtonWrapper, {backgroundColor: 'rgb(254,235,1)'}]}>
            <TouchableOpacity style={[styles.mainButton]}
              onPress= { () => { openKakaoLogin() } } 
              >
              <View style={{position:'absolute', left: 16}}>
                <Image source= { require('../../assets/img/kakao_logo.png') } />
              </View>
              <Text style={styles.mainButtonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.mainButtonWrapper, {backgroundColor: 'rgb(8,199,58)'}]}>
            <TouchableOpacity style={[styles.mainButton]}
              onPress= { () => { openNaverLogin() } } 
              >
              <View style={{position:'absolute', left: 16}}>
                <Image source= { require('../../assets/img/naver_logo.png') } />
              </View>
              <Text style={[styles.mainButtonText, {color:'#fff'}]}>네이버로 시작하기</Text>
            </TouchableOpacity>
          </View>
          
          { Platform.OS == 'ios' &&
            <View style={styles.mainButtonWrapper}>
              <AppleButton 
                style={{ width: "100%", height: '100%' }}
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={() => onAppleButtonPress("IOS")} />
            </View>
            }
          
        </View>

      </View>
      
    </View>
  );
}

export default Login;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  sectionTop: {
    flex:5,
    display: 'flex',
    // alignItems: 'center',
  },
  mainButtonWrapper: {
    marginVertical: 10,
    marginHorizontal: 30,
    backgroundColor:'green',
    // display: 'flex',
    // justifyContent:'center',
    height: 50,
    borderRadius: 10
  },
  loginContainer: {
    flex: 3,
    // marginTop: 20
    // paddingTop: 50
  },
  mainButton: {
    height: 50,
    display: 'flex',
    justifyContent:'center',
    alignContent: 'center'
  },
  mainButtonText: {
    textAlign: 'center',
    fontSize: 17
  }
})