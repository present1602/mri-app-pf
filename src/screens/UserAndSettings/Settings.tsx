import AsyncStorage from '@react-native-async-storage/async-storage';
import { NaverLogin } from '@react-native-seoul/naver-login';
import { logout as KakaoLogout } from "@react-native-seoul/kakao-login";
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Image, Alert, Dimensions, DevSettings } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppContext} from '../../provider/RootProvider'
import { SafeAreaView } from 'react-native-safe-area-context';


const WIDTH = Dimensions.get("window").width;

const Settings = () => {
  const navigation = useNavigation();
  const { state, resetUser } = useAppContext(); 
  const sns_type_list = ['10', '20', '30']
  
  const execLogout = async () =>{
    await AsyncStorage.getItem("user_auth").then((user:any) => {
      console.log("11 before remove user : ", user)
      
      const user_data = JSON.parse(user)
      console.log("user_data.sns_type : ", user_data.sns_type)
      console.log("user_data : ", user_data)
      if( !user_data.sns_type || !sns_type_list.includes(user_data.sns_type) ){
         Alert.alert("로그아웃 실행오류입니다")
         return;     
      }
      
      if(user_data.sns_type == '10'){
        const kakaologoutmsg = KakaoLogout()
        console.log("22(k) kakaologoutmsg : ", kakaologoutmsg)

      }else if(user_data.sns_type == '20'){
        NaverLogin.logout()
        console.log("22(n) exec naver logout")
      }
    })
    
    await AsyncStorage.removeItem("user_auth").then((user) => {
      console.log("33 ing remove user : ", state.user)
    })
    resetUser()
    // navigation.navigate("Splash");
    // DevSettings.reload()
    navigation.reset({
      routes: [{ name: "AuthScreens" }]
    });
  }
  const logout = () => {
    Alert.alert(
      "MRI", 
      "로그아웃하시겠습니까?",
      [
        {text: '예', onPress: () => execLogout(), style: 'cancel'},
        {text: '아니오'},
      ]  
    )
  }

  const deleteAccount = () => {
    navigation.navigate("DeleteAccount");
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.titleWrap}>
        <Text style={styles.title}>설정</Text>
      </View> */}
      <View style={styles.topSection}>
        <View style={styles.versionWrapper}>
          <View style={styles.itemTitle}>
            <Text style={styles.title}>버전</Text>
          </View>
          <View style={styles.itemValue}>
            <Text style={styles.title}>v0.10</Text>
          </View>
        </View>
      </View>
      <View> 
        {/* <View style={{marginTop:5}}>
          <TouchableOpacity onPress= { () => { navigation.navigate("TermsAndConditions")} } >
            <View style={styles.lineContent} >
              <View style={{ flex: 1 }}>
                <Text style={ styles.lineButtonText}>이용약관</Text> 
              </View>
              <View style={ styles.moveIconArea }>
                <Image source= {require('../../assets/img/move_icon.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={{marginVertical:5}}>
          <TouchableOpacity onPress= { () => { navigation.navigate("PersonalInfoAgreement")} } >
            <View style={styles.lineContent} >
              <View style={{ flex: 1 }}>
                <Text style={ styles.lineButtonText}>개인정보취급방침</Text> 
              </View>
              <View style={ styles.moveIconArea }>
                <Image source= {require('../../assets/img/move_icon.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
        
      {/* <View style={[styles.buttonGroupWrapper]}> */}
      <View style={[styles.buttonGroupWrapper, { width: (WIDTH/1.5) } ]}>
        <View style={[styles.buttonDivision, {borderRightWidth: 1, margin: 5, borderColor: 'rgb(112,112,112)'}]}>
          <TouchableOpacity onPress = { () => { logout() } }>
            <Text style={styles.bottomButtonText}>로그아웃</Text>
          </TouchableOpacity> 
        </View>

        <View style={styles.buttonDivision}>
          <TouchableOpacity onPress = { () => { deleteAccount() } }>
            <Text style={styles.bottomButtonText}>회원탈퇴</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  topSection: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  versionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    padding: 10
  },
  title: {
    fontSize: 22,
  },
  top: {
    height: 25
  },
  itemTitle: {
    width: 60,
    margin: 10
  },
  itemValue: {
    flex: 1,
    margin: 10
  },
  buttonGroupWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 15,
  },
  buttonDivision: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    color: 'rgb(112, 112,112)',
    // paddingVertical: 5,
    paddingHorizontal: 10,
  },

  emailSection:{
    marginTop:5, marginBottom:5,
    padding: 20
  },
  email:{
    fontSize: 16,
  },
  lineContent: {
    // margin: 10,
    display: 'flex', 
    flexDirection:'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  moveIconArea: {
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineButtonText: {
    fontSize: 16
  }

})
