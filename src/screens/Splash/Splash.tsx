// import AsyncStorage from '@react-native-community/async-storage';
import { NavigationRouteContext } from '@react-navigation/core';
import React, { useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { sns_login } from '../../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {useAppContext} from '../../provider/RootProvider'
import { getProfile } from '@react-native-seoul/naver-login';
import { StackActions } from '@react-navigation/native';


// const getStorageItem = async (item:any) => {
//   const data = await AsyncStorage.getItem(item);
//   return data;
// }

// const removeStorageItem = async (item:any) => {
//   AsyncStorage.getItem(item).then( item => {
//     if(item){
//       AsyncStorage.removeItem(item)
//     }
//   })
// }


const Splash = ({ navigation } : any) => {
  const {state, setUser} = useAppContext();

  const kakaoAutoLogin = async (token: string, user_data: any) => {
    const params = {
      sns_user_key: user_data.sns_user_key,
      sns_type: user_data.sns_type,
      access_token: user_data.access_token,
      auto_login: true,
      setUser: setUser
    }
    sns_login(params, navigation)
  }

  const naverAutoLogin = async (token: string, user_data:any) => {
    // const profileResult = await getProfile(token)
    // console.log("profileResult : ", profileResult)

    const params = {
      sns_user_key: user_data.sns_user_key,
      sns_type: user_data.sns_type,
      access_token: user_data.access_token,
      auto_login: true,
      setUser: setUser
    }
    sns_login(params, navigation)

  }
  const handleInitialRoute = async () => {
    console.log("call handle initial route")
    // AsyncStorage.removeItem("user_auth");
    AsyncStorage.getItem("user_auth").then((user:any) => {

      const user_data = JSON.parse(user)
      
      console.log("handleInitialRoute user_data : ", user_data)

      // console.log("user.sns_user_key : ", user_data.sns_user_key)
      // console.log("user.sns_type : ", user_data.sns_type)
      // console.log("user[access_token] : ", user_data.access_token)

      
      if(user_data && user_data.sns_user_key && user_data.sns_type && user_data.access_token){

        if(user_data.sns_type == '20'){
          naverAutoLogin(user_data.access_token, user_data)
          // if (profileResult.resultcode === "024") {
          //   Alert.alert("로그인 실패", profileResult.message);
          //   return;
          // }
        }else if(user_data.sns_type == '10'){
          kakaoAutoLogin(user_data.access_token, user_data)
        }

        // console.log("ancstorage get user the : ", user)
        
      }
      else{
        // navigation.navigate("AuthScreens")
        navigation.dispatch(
          StackActions.replace('AuthScreens')
        );
      }
    })
  }
  
  
  // const handleAsycStorageData = async (key:string) => {
    
  //   try {
  //     const value = await AsyncStorage.getItem(key)
  //     // console.log("====value : ", value)
  //     if(value != null){
  //       switch(key){
  //         case "access_token":
  //           setAccessToken(value) 
  //           break
  //         case "sns_user_key":
  //           setSnsUserKey(value) 
  //           break
  //         case "sns_type":
  //           setSnsType(value) 
  //           break
  //         default: 
  //           return;
  //       }
        
  //     }
  //   } catch(e) {
  //     // read error
  //   }
  // }
  // const removeAsyncStorageData = async (key:string) => {
  //   try {
  //     return await AsyncStorage.removeItem(key)
  //   } catch(e) {
  //     // read error
  //   }
  // }


  useEffect(() => {
    setTimeout(() => {
      handleInitialRoute()
    }, 1500)
    
    // handleAsycStorageData("access_token")
    // handleAsycStorageData("sns_user_key")
    // handleAsycStorageData("sns_type")
    // setTimeout(() => {
    //   if(accessToken !='' && snsUserKey !='' && snsType !='' ){
    //     const params = {
    //       access_token: accessToken,
    //       sns_type: snsType,   // "10": 카카오, "20": 네이버
    //       sns_user_key: snsUserKey      
    //     }
    //     const userResult:any = sns_login(params);
    //     console.log("userResult.user : ", userResult.user)  
        
    //     if(!userResult.user){
    //       Alert.alert("응답 오류 발생");
    //       return;
    //     }
    //     if(userResult.is_member =="N"){
    //       console.log("user none move to signup")
    //       navigation.navigate("SignUp");
    //     }
    //     else if(userResult.is_member == "Y"){
    //       console.log("user exist")
    //       if(userResult.user.status && userResult.user.status == "10"){
    //         navigation.navigate("OCR");
    //       }else{
    //         navigation.navigate("UnauthorizedUser");
    //       }
    //     }
    //   }else{
    //     navigation.navigate("AuthScreens")
    //   }
    // }, 2000)
    
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.mainSection}>
          <Image source={ require('../../assets/img/splash_main_content.png') } />
        </View>
        <View style={styles.bottomSection}>
          <Image source={ require('../../assets/img/mri_bottom_logo.png') } />
        </View>
      </View>
    </View>
  );
}

export default Splash;

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    paddingBottom: 50
  },
  mainLogo: {
    fontSize: 25,
    textAlign:'center'
  },
  mainSection: {
    flex:8,
    justifyContent:'center'
  },
  bottomLogo: {
    textAlign: 'center',
    fontSize: 20
  },
  bottomSection: {
    padding: 10,
    flex:1,
    // borderWidth:1,
    // borderColor:'blue',
    justifyContent:'center'
  }
})